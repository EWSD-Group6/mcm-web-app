import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../state/dashboard.service';
import {Observable} from 'rxjs/Observable';
import {StatisticAdminDashboard} from '../../api';
import {DashboardQuery} from '../state/dashboard.query';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  stats$: Observable<StatisticAdminDashboard>;
  loading$: Observable<boolean>;

  constructor(private dashboardService: DashboardService,
              private dashboardQuery: DashboardQuery) {
    this.loading$ = this.dashboardQuery.selectLoading();
    this.stats$ = this.dashboardQuery.select(x => x.adminStats);
  }

  ngOnInit(): void {
    this.dashboardService.loadAdminStats();
  }

}
