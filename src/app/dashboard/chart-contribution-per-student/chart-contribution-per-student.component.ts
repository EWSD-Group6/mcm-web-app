import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../state/dashboard.service';

@Component({
  selector: 'app-chart-contribution-per-student',
  templateUrl: './chart-contribution-per-student.component.html',
  styleUrls: ['./chart-contribution-per-student.component.scss']
})
export class ChartContributionPerStudentComponent implements OnInit {

  data: {
    name: string;
    value: number;
  }[];

  constructor(private service: DashboardService) {
    this.service.getContributionPerStudentChartData().subscribe(x => {
      this.data = x.data.map(item => ({
        name: item.name,
        value: item.count,
      }));
    });
  }

  ngOnInit(): void {
  }
}
