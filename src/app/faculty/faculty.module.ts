import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {RouterModule} from '@angular/router';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [IndexComponent, CreateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'index'},
      {path: 'index', component: IndexComponent},
      {path: 'create', component: CreateComponent},
    ]),
  ],
  exports: [RouterModule],
})
export class FacultyModule { }
