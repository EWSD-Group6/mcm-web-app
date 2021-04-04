import { Component, OnInit } from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Observable} from 'rxjs/Observable';
import {Contribution} from '../state/contribution.model';
import {ContributionQuery} from '../state/contribution.query';
import {ContributionService} from '../state/contribution.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@UntilDestroy()
@Component({
  selector: 'app-contribution-index',
  templateUrl: './contribution-index.component.html',
  styleUrls: ['./contribution-index.component.scss']
})
export class ContributionIndexComponent implements OnInit {
  data$: Observable<Contribution[]>;
  loading$: Observable<boolean>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  total$: Observable<number>;
  filterForm: FormGroup;

  constructor(private query: ContributionQuery,
              private service: ContributionService,
              private fb: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.loading$ = this.query.selectLoading();
    this.data$ = this.query.selectAll();
    this.total$ = this.query.select(x => x.paginate.total);
    this.pageSize$ = this.query.select(x => x.paginate.pageSize);
    this.pageIndex$ = this.query.select(x => x.paginate.pageIndex);

    this.filterForm = this.buildFilterForm();
  }

  ngOnInit(): void {
    this.service.get().subscribe();
    this.filterForm.valueChanges.pipe(untilDestroyed(this)).subscribe(
      value => this.service.updateQuery({
        ...value
      })
    );
  }

  onQueryParamsChange($event: NzTableQueryParams): void {
    this.service.updateQuery({
      page: $event.pageIndex - 1
    });
  }

  delete(id): void {
    this.service.remove(id);
  }

  buildFilterForm(): FormGroup {
    return this.fb.group({
      status: [null],
      contributeSessionId: [null],
      facultyId: [null],
      studentId: [null],
    });
  }

  canEdit() {
    return this.authenticationService.getCurrentRole() == "student";
  }
}
