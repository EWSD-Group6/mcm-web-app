import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserUserCreateReq} from '../../api';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Observable} from 'rxjs/Observable';
import {Faculty} from '../../faculty/state/faculty.model';
import {FacultyService} from '../../faculty/state/faculty.service';
import {FacultyQuery} from '../../faculty/state/faculty.query';
import {AccountService} from '../state/account.service';
import {markFormGroupDirty} from '../../core/form-utils';
import {ActivatedRoute, Router} from '@angular/router';
import RoleEnum = UserUserCreateReq.RoleEnum;
import {Account} from '../state/account.model';
import {filter, map, switchMap} from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {
  form: FormGroup;
  requiredFaculty = true;
  faculties$: Observable<Faculty[]>;
  isLoading = false;
  editingUser: Account;

  constructor(private fb: FormBuilder,
              private facultyService: FacultyService,
              private facultyQuery: FacultyQuery,
              private service: AccountService,
              private router: Router,
              private route: ActivatedRoute) {
    this.faculties$ = this.facultyQuery.selectAll();
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: [null, [Validators.required]],
      role: [RoleEnum.Student, [Validators.required]],
      status: ['active', [Validators.required]],
      facultyId: [null]
    });
    this.form.get('role').valueChanges.subscribe(value => this.requiredFaculty = value === RoleEnum.Student
      || value === RoleEnum.MarketingCoordinator
      || value === RoleEnum.Guest);
  }

  ngOnInit(): void {
    this.facultyService.get().subscribe();
    this.route.data.pipe(
      untilDestroyed(this),
      filter(x => x.isEdit),
      switchMap(() => this.route.paramMap),
      map(param => param.get('id')),
      map(x => Number(x)),
      switchMap(x => this.service.getById(x))
    ).subscribe(
      value => {
        this.editingUser = value;
        this.form.patchValue({
          ...this.editingUser,
        });
        this.form.get('password').clearValidators();
      }
    );
  }

  submitForm(): void {
    markFormGroupDirty(this.form);
    if (this.form.valid) {
      if (this.editingUser) {
        this.service.update(this.editingUser.id, this.form.value).subscribe(
          () => this.router.navigate(['/account'])
        );
      } else {
        this.service.add(this.form.value).subscribe(
          () => this.router.navigate(['/account'])
        );
      }
    }
  }

  loadMore(): void {
    this.facultyService.loadMore();
  }
}
