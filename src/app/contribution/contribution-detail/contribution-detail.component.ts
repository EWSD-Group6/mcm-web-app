import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-contribution-detail',
  templateUrl: './contribution-detail.component.html',
  styleUrls: ['./contribution-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContributionDetailComponent implements OnInit {
  visible = false;

  constructor() { }

  ngOnInit(): void {
  }

}
