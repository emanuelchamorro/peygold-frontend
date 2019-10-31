import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScPeyDashboardComponent} from './components/sc-pey-dashboard/sc-pey-dashboard.component';
import {GuardAuthService} from './services/guard-auth.service';
import {ScPeyLayoutComponent} from './layout/sc-pey-layout/sc-pey-layout.component';
import {ScPeyUsersComponent} from './components/sc-pey-users/sc-pey-users.component';

export const routes: Routes = [
  {
    path: 'sc',
    component: ScPeyLayoutComponent,
    canActivate: [GuardAuthService],
    children: [
      {
        path: 'dashboard',
        component: ScPeyDashboardComponent,
        data: {
          title: 'Login Page'
        },
      },
      {
        path: 'users',
        component: ScPeyUsersComponent,
        data: {
          title: 'Login Page'
        },
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class ScPeyGoldRouting {}
