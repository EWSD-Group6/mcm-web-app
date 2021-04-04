import {Injectable} from '@angular/core';
import {finalize, map, switchMap, take, tap} from 'rxjs/operators';
import {Account, createAccount} from './account.model';
import {AccountStore} from './account.store';
import {UsersApiService, UserUserCreateReq, UserUserUpdateReq} from '../../api';
import {Observable} from 'rxjs/Observable';
import {AccountQuery} from './account.query';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({providedIn: 'root'})
export class AccountService {

  constructor(private store: AccountStore,
              private api: UsersApiService,
              private query: AccountQuery,
              private nzNotification: NzNotificationService) {
  }

  get(): Observable<any> {
    this.store.setLoading(true);
    return this.query.select(x => x.query).pipe(
      take(1),
      switchMap(query => this.api.usersGet(
        query.limit,
        query.page,
      )),
      tap(x => this.store.set(x.data.map(item => createAccount(item)))),
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

  add(req: UserUserCreateReq): Observable<any> {
    return this.api.usersPost(req).pipe(
      tap(x => this.store.add(createAccount(x)))
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

  delete(id: number): void {
    this.api.usersIdDelete(id).pipe(
      tap(() => this.store.remove(id)),
      tap(() => this.nzNotification.success('Delete account', `Account #${id} deleted`)),
    ).subscribe();
  }

  getById(id: number): Observable<Account> {
    return this.api.usersIdGet(id).pipe(map(x => createAccount(x)));
  }

  update(id: number, value: UserUserUpdateReq): Observable<any> {
    return this.api.usersIdPatch(id, value).pipe(
      tap(x => this.store.update(id, createAccount(x)))
    );
  }
}
