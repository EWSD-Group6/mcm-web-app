import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {SessionService} from '../state/session.service';
import {SessionQuery} from '../state/session.query';
import {Session} from '../state/session.model';

@Component({
  selector: 'app-session-index',
  templateUrl: './session-index.component.html',
  styleUrls: ['./session-index.component.scss']
})
export class SessionIndexComponent implements OnInit {

  data$: Observable<Session[]>;
  loading$: Observable<boolean>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  total$: Observable<number>;

  constructor(private service: SessionService,
              private query: SessionQuery) {
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
