import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {DashboardStore} from './dashboard.store';
import {
  ContributeSessionsApiService,
  ContributesessionSessionRes,
  StatisticContributionFacultyChart,
  StatisticContributionStudentChart,
  StatisticsApiService
} from '../../api';
import {Observable} from 'rxjs/Observable';

@Injectable({providedIn: 'root'})
export class DashboardService {

  constructor(private dashboardStore: DashboardStore,
              private api: StatisticsApiService,
              private contributeSessionApiService: ContributeSessionsApiService) {
  }

  loadAdminStats(): void {
    this.api.statisticsAdminDashboardGet().pipe(
      tap(x => this.dashboardStore.update({
        adminStats: x
      }))
    ).subscribe();
  }

  getContributionPerFacultyChartData(): Observable<StatisticContributionFacultyChart> {
    return this.api.statisticsContributionFacultyChartGet();
  }

  getContributionPerStudentChartData(): Observable<StatisticContributionStudentChart> {
    return this.api.statisticsContributionStudentChartGet();
  }

  getCurrentSession(): Observable<ContributesessionSessionRes> {
    return this.contributeSessionApiService.contributeSessionsCurrentGet();
  }
}
