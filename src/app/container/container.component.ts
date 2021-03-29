import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthzLoginResponse, UserUserCreateReq} from '../api';
import RoleEnum = UserUserCreateReq.RoleEnum;

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  isCollapsed = false;
  isLoggedIn$: Observable<boolean>;
  menus: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      link: '/dashboard',
      roles: [RoleEnum.Admin, RoleEnum.Student, RoleEnum.MarketingCoordinator, RoleEnum.Guest, RoleEnum.MarketingManager],
    },
    {
      title: 'Contribution',
      icon: 'shopping-cart',
      roles: [RoleEnum.Student, RoleEnum.MarketingCoordinator],
      children: [
        {
          title: 'Contribution List',
          icon: 'dashboard',
          link: '/contribution/index',
          roles: [RoleEnum.Student, RoleEnum.MarketingCoordinator]
        },
        {
          title: 'Create Contribution',
          icon: 'dashboard',
          link: '/contribution/create',
          roles: [RoleEnum.Student]
        }
      ],
    },
    {
      title: 'Account',
      icon: 'usergroup-add',
      roles: [RoleEnum.Admin],
      children: [
        {
          title: 'Account List',
          icon: 'dashboard',
          link: '/account/index',
          roles: [RoleEnum.Admin],
        },
        {
          title: 'Create Account',
          icon: 'dashboard',
          link: '/account/create',
          roles: [RoleEnum.Admin],
        }
      ],
    },
    {
      title: 'Contribute Session',
      icon: 'cloud-upload',
      roles: [RoleEnum.Admin, RoleEnum.MarketingManager],
      children: [
        {
          title: 'Contribute Session List',
          icon: 'dashboard',
          link: '/contribute-session/index',
          roles: [RoleEnum.Admin, RoleEnum.MarketingManager],
        },
        {
          title: 'Create Contribution Session',
          icon: 'dashboard',
          link: '/contribute-session/create',
          roles: [RoleEnum.Admin],
        }
      ],
    },
    {
      title: 'Faculty',
      icon: 'group',
      roles: [RoleEnum.Admin],
      children: [
        {
          title: 'Faculty List',
          icon: 'dashboard',
          link: '/faculty/index',
          roles: [RoleEnum.Admin],
        },
        {
          title: 'Create Faculty',
          icon: 'dashboard',
          link: '/faculty/create',
          roles: [RoleEnum.Admin],
        }
      ],
    },
  ];
  user$: Observable<AuthzLoginResponse>;
  menus$: Observable<MenuItem[]>;

  constructor(private authService: AuthenticationService) {
    this.isLoggedIn$ = authService.isLoggedIn();
    this.user$ = authService.getCurrentLoggedInUser();
    this.menus$ = this.user$.pipe(
      map(x => x.role as RoleEnum),
      map(role => this.filterMenusByRole(role, this.menus))
    );
  }

  filterMenusByRole(role: RoleEnum, menus: MenuItem[]): MenuItem[] {
    const result = [];
    for (const menu of menus) {
      if (menu.roles.includes(role)) {
        if (menu.children) {
          menu.children = this.filterMenusByRole(role, menu.children);
        }
        result.push(menu);
      }
    }
    return result;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }
}

export interface MenuItem {
  title: string;
  icon: string;
  link?: string;
  roles: RoleEnum[];
  children?: MenuItem[];
}

