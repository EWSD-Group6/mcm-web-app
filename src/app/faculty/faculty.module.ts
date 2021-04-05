import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FacultyIndexComponent} from './faculty-index/faculty-index.component';
import {FacultyCreateComponent} from './faculty-create/faculty-create.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzInputModule} from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';


@NgModule({
  declarations: [FacultyIndexComponent, FacultyCreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'index'},
      {path: 'index', component: FacultyIndexComponent},
      {path: 'create', component: FacultyCreateComponent},
      {
        path: ':id/edit', component: FacultyCreateComponent, data: {
          breadcrumb: 'Faculty Edit',
          isEdit: true
        }
      },
    ]),
    NzTableModule,
    SharedModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzPopconfirmModule,
  ],
  exports: [RouterModule],
})
export class FacultyModule { }
