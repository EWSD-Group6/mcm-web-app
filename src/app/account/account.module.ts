import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountIndexComponent} from './account-index/account-index.component';
import {AccountCreateComponent} from './account-create/account-create.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NzFormModule} from 'ng-zorro-antd/form';
import {ReactiveFormsModule} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [AccountIndexComponent, AccountCreateComponent],
  imports: [
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'index'},
      {
        path: 'index', component: AccountIndexComponent, data: {
          breadcrumb: 'Account List',
        }
      },
      {
        path: 'create', component: AccountCreateComponent, data: {
          breadcrumb: 'Account Create',
        }
      },
    ]),
    CommonModule,
    NzTableModule,
    NzButtonModule,
    SharedModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    NzSpinModule,
    NzPopconfirmModule,
  ],
  exports: [RouterModule]
})
export class AccountModule {
}
