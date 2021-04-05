import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { DashboardMarketingCoordinatorComponent } from './dashboard-marketing-coordinator/dashboard-marketing-coordinator.component';
import { DashboardGuestComponent } from './dashboard-guest/dashboard-guest.component';
import { DashboardMarketingManagerComponent } from './dashboard-marketing-manager/dashboard-marketing-manager.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzDividerModule} from "ng-zorro-antd/divider";

@NgModule({
  declarations: [DashboardComponent,
    DashboardStudentComponent,
    DashboardMarketingCoordinatorComponent,
    DashboardGuestComponent,
    DashboardMarketingManagerComponent,
    DashboardAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DashboardComponent}
    ]),
    NgxChartsModule,
    NzGridModule,
    NzStatisticModule,
    NzCardModule,
    NzDividerModule,
  ]
})
export class DashboardModule { }
