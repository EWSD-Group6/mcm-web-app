import { Component, OnInit } from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Observable} from "rxjs/Observable";
import {Contribution} from "../state/contribution.model";
import {ContributionQuery} from "../state/contribution.query";
import {ContributionService} from "../state/contribution.service";

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

  constructor(private query: ContributionQuery,
              private service: ContributionService) {
    this.loading$ = this.query.selectLoading();
    this.data$ = this.query.selectAll();
    this.total$ = this.query.select(x => x.paginate.total);
    this.pageSize$ = this.query.select(x => x.paginate.pageSize);
    this.pageIndex$ = this.query.select(x => x.paginate.pageIndex);
  }

  ngOnInit(): void {
    this.service.get().subscribe();
  }

  onQueryParamsChange($event: NzTableQueryParams): void {
    this.service.updateQuery({
      page: $event.pageIndex - 1
    });
  }
}
