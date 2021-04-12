import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {StatisticAdminDashboard} from '../../api';

export interface DashboardState {
  adminStats: StatisticAdminDashboard;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'dashboard'})
export class DashboardStore extends Store<DashboardState> {

  constructor() {
    super({});
  }

}
