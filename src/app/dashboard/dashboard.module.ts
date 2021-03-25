import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', component: DashboardComponent}
    ]),
    NgxChartsModule,
  ]
})
export class DashboardModule { }
