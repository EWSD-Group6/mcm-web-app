import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../state/dashboard.service';

@Component({
  selector: 'app-chart-contribution-per-faculty',
  templateUrl: './chart-contribution-per-faculty.component.html',
  styleUrls: ['./chart-contribution-per-faculty.component.scss']
})
export class ChartContributionPerFacultyComponent implements OnInit {

  data: {
    name: string;
    value: number;
  }[];

  constructor(private service: DashboardService) {
    this.service.getContributionPerFacultyChartData().subscribe(x => {
      this.data = x.data.map(item => ({
        name: item.name,
        value: item.count,
      }));
    });
  }

  ngOnInit(): void {
  }
}
