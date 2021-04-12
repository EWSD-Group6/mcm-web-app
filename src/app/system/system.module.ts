import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { TermAndConditionEditComponent } from './term-and-condition-edit/term-and-condition-edit.component';
import {QuillModule} from 'ngx-quill';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ReactiveFormsModule} from '@angular/forms';
import {NzMessageModule} from 'ng-zorro-antd/message';


@NgModule({
  declarations: [TermAndConditionEditComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    QuillModule.forRoot(),
    NzButtonModule,
    ReactiveFormsModule,
    NzMessageModule,
  ]
})
export class SystemModule { }
