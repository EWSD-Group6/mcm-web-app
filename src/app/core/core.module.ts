import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {RouterModule} from '@angular/router';
import {Page404Component} from './components/page404/page404.component';



@NgModule({
  declarations: [Page404Component],
  imports: [
    CommonModule,
    NzResultModule,
    NzButtonModule,
    RouterModule
  ]
})
export class CoreModule { }
