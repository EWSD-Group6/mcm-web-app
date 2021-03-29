import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SessionCreateComponent} from './session-create/session-create.component';
import {SessionIndexComponent} from './session-index/session-index.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {SharedModule} from '../shared/shared.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [SessionCreateComponent, SessionIndexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'index'},
      {path: 'index', component: SessionIndexComponent},
      {path: 'create', component: SessionCreateComponent},
    ]),
    NzTableModule,
    SharedModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
  ],
  exports: [RouterModule],
})
export class ContributeSessionModule { }
