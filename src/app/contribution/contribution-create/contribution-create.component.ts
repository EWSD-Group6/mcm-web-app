import { Component, OnInit } from '@angular/core';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {NzMessageService} from 'ng-zorro-antd/message';
import {environment} from '../../../environments/environment';
import {ContributionService} from '../state/contribution.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-contribution-create',
  templateUrl: './contribution-create.component.html',
  styleUrls: ['./contribution-create.component.scss']
})
export class ContributionCreateComponent implements OnInit {
  fileListDocument: NzUploadFile[] = [];
  fileListImage: NzUploadFile[] = [];

  constructor(private msg: NzMessageService,
              private service: ContributionService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  buildForm() {
    this.fb.group({
      title: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      description: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(512)]],

    });
  }

  submitForm() {
    if (this.fileListDocument.length === 0 && this.fileListImage.length === 0) {
      this.msg.error('Please choose at least one image or document');
      return;
    }
    this.service.add({
      article: this.fileListDocument.length > 0 ? {link: this.fileListDocument[0].response.key} : undefined,
      description:
    })
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
