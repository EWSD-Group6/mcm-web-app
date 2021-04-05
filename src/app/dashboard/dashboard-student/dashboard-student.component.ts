import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../contribute-session/state/session.service';
import {SessionQuery} from '../../contribute-session/state/session.query';
import {Session} from '../../contribute-session/state/session.model';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';


@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {

  deadline: number;
  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

  constructor(private service:SessionService) {
    this.deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  }

  ngOnInit(): void {
  }

}
