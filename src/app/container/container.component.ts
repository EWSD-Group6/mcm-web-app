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
      roles: [RoleEnum.Admin],
      children: [
        {
          title: 'Nạp tiền',
          icon: 'cash',
          link: '/dashboard/pricing',
          roles: [RoleEnum.Admin]
        },
        {
          title: 'Lịch sử giao dịch',
          icon: 'history',
          link: '/dashboard/history',
          roles: [RoleEnum.Admin]
        },
        {
          title: 'Liên hệ',
          icon: 'history',
          link: '/dashboard/contact',
          roles: [RoleEnum.Admin]
        }
      ]
    },
    {
      title: 'Đơn hàng',
      icon: 'shopping-cart',
      roles: [RoleEnum.Admin],
      children: [
        {
          title: 'Danh sách đơn',
          icon: 'dashboard',
          link: '/job/index',
          roles: [RoleEnum.Admin]
        },
        {
          title: 'Đặt đơn',
          icon: 'dashboard',
          link: '/job/create',
          roles: [RoleEnum.Admin]
        }
      ],
    },
    {
      title: 'Tài khoản',
      icon: 'usergroup-add',
      roles: [RoleEnum.Admin],
      children: [
        {
          title: 'Danh sách tài khoản',
          icon: 'dashboard',
          link: '/account/index',
          roles: [RoleEnum.Admin],
        },
        {
          title: 'Thêm tài khoản mới',
          icon: 'dashboard',
          link: '/account/create',
          roles: [RoleEnum.Admin],
        }
      ],
    },
    {
      title: 'Sản phẩm',
      icon: 'skin',
      roles: [RoleEnum.Admin],
      children: [
        {
          title: 'Danh sách sản phẩm',
          icon: 'dashboard',
          link: '/product/index',
          roles: [RoleEnum.Admin],
        },
        {
          title: 'Thêm sản phẩm',
          icon: 'dashboard',
          link: '/product/create',
          roles: [RoleEnum.Admin],
        }
      ],
    },
    {
      title: 'Proxy',
      icon: 'dashboard',
      link: '/proxy',
      roles: [RoleEnum.Admin],
    },
    {
      title: 'User',
      icon: 'dashboard',
      link: '/user',
      roles: [RoleEnum.Admin],
    },
    {
      title: 'Profile',
      icon: 'dashboard',
      link: '/profile',
      roles: [RoleEnum.Admin],
    }
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

