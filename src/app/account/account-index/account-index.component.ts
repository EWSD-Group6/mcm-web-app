import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Faculty} from '../../faculty/state/faculty.model';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {AccountService} from '../state/account.service';
import {AccountQuery} from '../state/account.query';

@Component({
  selector: 'app-account-index',
  templateUrl: './account-index.component.html',
  styleUrls: ['./account-index.component.scss']
})
export class AccountIndexComponent implements OnInit {

  data$: Observable<Faculty[]>;
  loading$: Observable<boolean>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  total$: Observable<number>;

  constructor(private service: AccountService,
              private query: AccountQuery) {
    this.loading$ = this.query.selectLoading();
    this.data$ = this.query.selectAll();
    this.total$ = this.query.select(x => x.paginate.total);
    this.pageSize$ = this.query.select(x => x.paginate.pageSize);
    this.pageIndex$ = this.query.select(x => x.paginate.pageIndex);
  }

  ngOnInit(): void {
  }

  onQueryParamsChange($event: NzTableQueryParams): void {
    this.service.updateQuery({
      page: $event.pageIndex - 1
    });
  }

  delete(id) {
    this.service.delete(id);
  }
}
