import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'appDate'
})
export class AppDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {
  }

  transform(value: any): string {
    return this.datePipe.transform(value, 'medium');
  }

}
