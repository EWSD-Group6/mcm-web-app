import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ImagePipe } from './pipes/image.pipe';
import { AppDatePipe } from './pipes/app-date.pipe';
import { FacultyPipe } from './pipes/faculty.pipe';
import { RoleTagComponent } from './components/role-tag/role-tag.component';
import {NzTagModule} from "ng-zorro-antd/tag";



@NgModule({
  declarations: [ImagePipe, AppDatePipe, FacultyPipe, RoleTagComponent],
  imports: [
    CommonModule,
    NzTagModule
  ],
  providers: [DatePipe, ImagePipe, AppDatePipe, FacultyPipe],
  exports: [ImagePipe, AppDatePipe, FacultyPipe, RoleTagComponent]
})
export class SharedModule { }
