import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ImagePipe } from './pipes/image.pipe';
import { AppDatePipe } from './pipes/app-date.pipe';



@NgModule({
  declarations: [ImagePipe, AppDatePipe],
  imports: [
    CommonModule
  ],
  providers: [DatePipe, ImagePipe, AppDatePipe],
  exports: [ImagePipe, AppDatePipe]
})
export class SharedModule { }
