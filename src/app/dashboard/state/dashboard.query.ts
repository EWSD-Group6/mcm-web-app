import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {DashboardState, DashboardStore} from './dashboard.store';

@Injectable({providedIn: 'root'})
export class DashboardQuery extends Query<DashboardState> {

  constructor(protected store: DashboardStore) {
    super(store);
  }

}
