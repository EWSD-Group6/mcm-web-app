import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Faculty} from './faculty.model';

export interface FacultyState extends EntityState<Faculty> {
  paginate: {
    total: number;
    pageSize: number;
    pageIndex: number;
    lastPage: number;
  };
  query: {
    page?: number;
    limit?: number;
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'faculty'})
export class FacultyStore extends EntityStore<FacultyState> {

  constructor() {
    super({
      paginate: {
        total: null,
        pageSize: 10,
        pageIndex: 1,
        lastPage: null,
      },
      query: {
        limit: 10,
        page: 0,
      },
    });
  }

}
