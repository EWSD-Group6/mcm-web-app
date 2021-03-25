import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ContainerComponent} from './container/container.component';
import {AuthGuard} from './core/guards/auth.guard';
import {Page404Component} from './core/components/page404/page404.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: '/dashboard'},
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {
          breadcrumb: 'Dashboard'
        }
      },
      {
        path: 'faculty', loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule), data: {
          breadcrumb: 'Faculty'
        }
      },
      {
        path: 'contribute-session', loadChildren: () => import('./contribute-session/contribute-session.module')
          .then(m => m.ContributeSessionModule), data: {
          breadcrumb: 'Contribute Session'
        }
      },
      {
        path: 'contribution',
        loadChildren: () => import('./contribution/contribution.module').then(m => m.ContributionModule),
        data: {
          breadcrumb: 'Contribution'
        }
      },
      {
        path: '**', pathMatch: 'full', component: Page404Component
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
