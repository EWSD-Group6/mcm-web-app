import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../state/dashboard.service';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ContributesessionSessionRes} from '../../api';


@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {

  currentSession: ContributesessionSessionRes;
  calendarControl = new FormControl(new Date());
  dateMap: Record<string, {
    type: string,
    content: string
  }>;
  isErrorNoSession = false;

  constructor(private service: DashboardService,
              private datePipe: DatePipe) {
    this.service.getCurrentSession().subscribe(
      x => {
        this.currentSession = {
          ...x,
          closureTime: new Date(x.closureTime) as any,
          finalClosureTime: new Date(x.finalClosureTime) as any,
        };
        this.dateMap = {};
        this.dateMap[this.datePipe.transform(x.openTime, 'shortDate')] = {
          type: 'success',
          content: 'Open time contribution #' + x.id
        };
        this.dateMap[this.datePipe.transform(x.closureTime, 'shortDate')] = {
          type: 'success',
          content: 'Closure time contribution #' + x.id
        };
        this.dateMap[this.datePipe.transform(x.finalClosureTime, 'shortDate')] = {
          type: 'success',
          content: 'Final closure time contribution #' + x.id
        };
      },
      err => this.isErrorNoSession = true
    );
  }

  ngOnInit(): void {
  }

}
