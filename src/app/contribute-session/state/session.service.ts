import {Injectable} from '@angular/core';
import {finalize, switchMap, take, tap} from 'rxjs/operators';
import {createSession} from './session.model';
import {SessionStore} from './session.store';
import {Observable} from 'rxjs/Observable';
import {ContributeSessionsApiService, ContributesessionSessionCreateReq} from '../../api';
import {SessionQuery} from './session.query';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({providedIn: 'root'})
export class SessionService {

  constructor(private store: SessionStore,
              private api: ContributeSessionsApiService,
              private query: SessionQuery,
              private nzNotification: NzNotificationService) {
  }


  get(): Observable<any> {
    this.store.setLoading(true);
    return this.query.select(x => x.query).pipe(
      take(1),
      switchMap(query => this.api.contributeSessionsGet(
        query.limit,
        query.page,
      )),
      tap(x => this.store.set(x.data.map(item => createSession(item)))),
      tap(x => this.store.update({
        paginate: {
          total: x.total,
          pageIndex: x.currentPage + 1,
          pageSize: x.perPage,
        }
      })),
      finalize(() => this.store.setLoading(false)),
    );
  }

  add(req: ContributesessionSessionCreateReq): Observable<any> {
    return this.api.contributeSessionsPost(req).pipe(
      tap(x => this.store.add(createSession(x)))
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

  delete(id: any) {
    return this.api.contributeSessionsIdDelete(id).pipe(
      tap(() => this.store.remove(id)),
      tap(() => this.nzNotification.success('Delete session', `Session #${id} deleted`)),
    ).subscribe();
  }

}
