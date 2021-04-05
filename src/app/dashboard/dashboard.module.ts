import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { DashboardStudentComponent } from './dashboard-student/dashboard-student.component';
import { DashboardMarketingCoordinatorComponent } from './dashboard-marketing-coordinator/dashboard-marketing-coordinator.component';
import { DashboardGuestComponent } from './dashboard-guest/dashboard-guest.component';
import { DashboardMarketingManagerComponent } from './dashboard-marketing-manager/dashboard-marketing-manager.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzCardModule} from 'ng-zorro-antd/card';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, DashboardStudentComponent, DashboardMarketingCoordinatorComponent, DashboardGuestComponent, DashboardMarketingManagerComponent, DashboardAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DashboardComponent}
    ]),
    NgxChartsModule,
    NzStatisticModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzSpaceModule,
    NzCalendarModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
