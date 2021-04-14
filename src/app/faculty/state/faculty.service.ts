import {Injectable} from '@angular/core';
import {finalize, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import {createFaculty, Faculty} from './faculty.model';
import {FacultyStore} from './faculty.store';
import {Observable} from 'rxjs/Observable';
import {FacultiesApiService, FacultyFacultyCreateReq} from '../../api';
import {FacultyQuery} from './faculty.query';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {iif, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FacultyService {

  constructor(private store: FacultyStore,
              private api: FacultiesApiService,
              private query: FacultyQuery,
              private nzNotification: NzNotificationService) {
  }

  get(): Observable<any> {
    this.store.setLoading(true);
    return this.query.select(x => x.query).pipe(
      take(1),
      switchMap(query => this.api.facultiesGet(
        query.limit,
        query.page,
      )),
      tap(x => this.store.set(x.data.map(item => createFaculty(item)))),
      tap(x => this.store.update({
        paginate: {
          total: x.total,
          pageIndex: x.currentPage + 1,
          pageSize: x.perPage,
          lastPage: x.lastPage,
        }
      })),
      finalize(() => this.store.setLoading(false)),
    );
  }

  add(req: FacultyFacultyCreateReq): Observable<any> {
    return this.api.facultiesPost(req).pipe(
      tap(x => this.store.add(createFaculty(x)))
    );
  }

  updateQuery(param: {
    limit?: number;
    page?: number;
  }): void {
    this.store.update(x => ({
      query: {
        ...x.query,
        ...param,
      }
    }));
    this.get().subscribe();
  }

  loadMore(): void {
    this.query.select(x => x.paginate.lastPage === x.query.page).pipe(
      take(1),
    ).subscribe(cantLoadMore => {
      if (!cantLoadMore) {
        this.store.update(x => ({
          query: {
            ...x.query,
            page: this.query.getValue().query.page + 1,
          }
        }));

        this.store.setLoading(true);
        this.query.select(x => x.query).pipe(
          take(1),
          switchMap(query => this.api.facultiesGet(
            query.limit,
            query.page,
          )),
          tap(x => this.store.add(x.data.map(item => createFaculty(item)))),
          tap(x => this.store.update({
            paginate: {
              total: x.total,
              pageIndex: x.currentPage + 1,
              pageSize: x.perPage,
              lastPage: x.lastPage,
            }
          })),
          finalize(() => this.store.setLoading(false)),
        ).subscribe();
      }
    });
  }

  getById(id: number): Observable<Faculty> {
    return this.query.selectEntity(id).pipe(
      mergeMap(x => iif(
        () => !!x,
        of(x),
        this.api.facultiesIdGet(id).pipe(map(r => createFaculty(r)))
      ))
    );
  }

  delete(id: any) {
    this.api.facultiesIdDelete(id).pipe(
      tap(() => this.store.remove(id)),
      tap(() => this.nzNotification.success('Delete Faculty', `Faculty #${id} deleted`)),
    ).subscribe();
  }

  update(id: number, value: any): Observable<any> {
    return this.api.facultiesIdPut(id, value).pipe(
      tap(() => this.nzNotification.success('Update Faculty', `Faculty #${id} updated`)),
    );
  }
}
