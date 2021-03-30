import {Component, OnInit} from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {FacultyService} from '../state/faculty.service';
import {Observable} from 'rxjs/Observable';
import {Faculty} from '../state/faculty.model';
import {FacultyQuery} from '../state/faculty.query';

@Component({
  selector: 'app-faculty-index',
  templateUrl: './faculty-index.component.html',
  styleUrls: ['./faculty-index.component.scss']
})
export class FacultyIndexComponent implements OnInit {
  data$: Observable<Faculty[]>;
  loading$: Observable<boolean>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  total$: Observable<number>;

  constructor(private service: FacultyService,
              private query: FacultyQuery) {
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

  delete(id){
    this.service.delete(id);
  }
}
