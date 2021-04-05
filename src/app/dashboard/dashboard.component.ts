import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {Observable} from 'rxjs/Observable';
import {AuthzLoginResponse, UserUserCreateReq} from '../api';
import RoleEnum = UserUserCreateReq.RoleEnum;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser$: Observable<AuthzLoginResponse>;
  constructor(private authenticationService: AuthenticationService) {
    this.currentUser$ = this.authenticationService.getCurrentLoggedInUser();
  }

  ngOnInit(): void {
  }

}
