import {Component, OnInit} from '@angular/core';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {NzMessageService} from 'ng-zorro-antd/message';
import {environment} from '../../../environments/environment';
import {ContributionService} from '../state/contribution.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {markFormGroupDirty} from '../../core/form-utils';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ContributionQuery} from '../state/contribution.query';
import {ImagePipe} from '../../shared/pipes/image.pipe';
import {ContributionContributionCreateReq} from '../../api';
import {Contribution} from '../state/contribution.model';

@UntilDestroy()
@Component({
  selector: 'app-contribution-create',
  templateUrl: './contribution-create.component.html',
  styleUrls: ['./contribution-create.component.scss']
})
export class ContributionCreateComponent implements OnInit {
  fileListDocument: NzUploadFile[] = [];
  fileListImage: NzUploadFile[] = [];
  form: FormGroup;
  editingContribution: Contribution;
  onRemoveUploadedImage: any;

  constructor(private msg: NzMessageService,
              private service: ContributionService,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private query: ContributionQuery,
              private imagePipe: ImagePipe) {
    this.form = this.buildForm();
    this.route.data.pipe(
      untilDestroyed(this),
      filter(x => x.isEdit),
      switchMap(() => this.route.paramMap),
      map(param => Number(param.get('id'))),
      switchMap(id => this.service.getById(id)),
      tap(c => this.editingContribution = c),
      tap(contribution => this.service.getImages(contribution.id)),
    ).subscribe(contribution => {
      this.form.patchValue(contribution);
      this.query.select(x => x.images)
        .pipe(
          untilDestroyed(this),
          filter(x => !!x),
          tap(images => {
            this.fileListImage = images.map(image => ({
              status: 'done',
              uid: image.key,
              url: this.imagePipe.transform(image.link, [300, 0]),
              name: image.key,
              response: {
                key: image.key
              }
            }));
          }),
        )
        .subscribe();
    });
  }

  ngOnInit(): void {
  }

  buildForm(): FormGroup {
    return this.fb.group({
      title: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      description: [null, [Validators.minLength(15), Validators.maxLength(512)]],

    });
  }

  submitForm(): void {
    if (this.fileListDocument.length === 0 && this.fileListImage.length === 0) {
      this.msg.error('Please choose at least one image or document');
      return;
    }
    markFormGroupDirty(this.form);
    if (this.form.valid) {
      if (!this.editingContribution) {
        this.service.add(this.buildReq()).subscribe(() => this.router.navigate(['/contribution/index']));
        return;
      }
      this.service.update(this.editingContribution.id, this.buildReq()).subscribe(
        () => this.router.navigate(['/contribution', this.editingContribution.id])
      );
    }
  }

  private buildReq(): ContributionContributionCreateReq {
    return {
      article: this.fileListDocument.length > 0 ? {link: this.fileListDocument[0].response.key} : undefined,
      description: this.form.get('description').value,
      title: this.form.get('title').value,
      images: this.fileListImage.map(x => ({
        key: x.response.key,
        title: 'default title'
      }))
    };
  }

  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  get uploadImageEndpoint(): string {
    return environment.baseApi + '/storage/upload?type=image';
  }

  get uploadDocumentEndpoint(): string {
    return environment.baseApi + '/storage/upload?type=document';
  }

  get authHeader(): Record<string, string> {
    return {
      authorization: 'Bearer ' + localStorage.getItem('token')
    };
  }
}
