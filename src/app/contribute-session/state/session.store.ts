import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Session} from './session.model';

export interface SessionState extends EntityState<Session> {
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
@StoreConfig({name: 'session'})
export class SessionStore extends EntityStore<SessionState> {

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
