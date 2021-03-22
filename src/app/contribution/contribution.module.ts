import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import {RouterModule} from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import {NzGridModule} from "ng-zorro-antd/grid";



@NgModule({
  declarations: [IndexComponent, CreateComponent, DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'index'},
      {path: 'index', component: IndexComponent},
      {path: 'create', component: CreateComponent},
      {path: ':id', component: DetailComponent},
    ]),
    NzGridModule,
  ],
  exports: [RouterModule],
})
export class ContributionModule { }
