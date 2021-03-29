import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Account} from './account.model';

export interface AccountState extends EntityState<Account> {
  paginate: {
    total: number;
    pageSize: number;
    pageIndex: number;
  };
  query: {
    page?: number;
    limit?: number;
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'account'})
export class AccountStore extends EntityStore<AccountState> {

  constructor() {
    super({
      paginate: {
        total: null,
        pageSize: 10,
        pageIndex: 1,
      },
      query: {
        limit: 10,
        page: 0,
      },
    });
  }

}
