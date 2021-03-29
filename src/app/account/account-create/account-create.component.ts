import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserUserCreateReq} from '../../api';
import {UntilDestroy} from '@ngneat/until-destroy';
import {Observable} from 'rxjs/Observable';
import {Faculty} from '../../faculty/state/faculty.model';
import {FacultyService} from '../../faculty/state/faculty.service';
import {FacultyQuery} from '../../faculty/state/faculty.query';
import {AccountService} from '../state/account.service';
import {markFormGroupDirty} from '../../core/form-utils';
import {Router} from '@angular/router';
import RoleEnum = UserUserCreateReq.RoleEnum;

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

  constructor(private fb: FormBuilder,
              private facultyService: FacultyService,
              private facultyQuery: FacultyQuery,
              private service: AccountService,
              private router: Router) {
    this.faculties$ = this.facultyQuery.selectAll();
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      role: [RoleEnum.Student, [Validators.required]],
      facultyId: [null]
    });
    this.form.get('role').valueChanges.subscribe(value => this.requiredFaculty = value === RoleEnum.Student
      || value === RoleEnum.MarketingCoordinator
      || value === RoleEnum.Guest);
  }

  ngOnInit(): void {
    this.facultyService.get().subscribe();
  }

  submitForm(): void {
    markFormGroupDirty(this.form);
    if (this.form.valid) {
      this.service.add(this.form.value).subscribe(
        () => this.router.navigate(['/account'])
      );
    }
  }

  loadMore(): void {
    this.facultyService.loadMore();
  }
}
