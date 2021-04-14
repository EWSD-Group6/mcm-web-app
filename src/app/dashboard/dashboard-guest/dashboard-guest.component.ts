import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-dashboard-guest',
  templateUrl: './dashboard-guest.component.html',
  styleUrls: ['./dashboard-guest.component.scss']
})
export class DashboardGuestComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/contribution/index']);
  }

}
