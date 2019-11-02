import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScPeyDashboardComponent} from './components/sc-pey-dashboard/sc-pey-dashboard.component';
import {GuardAuthService} from './services/guard-auth.service';
import {UIPeyLayoutComponent} from '../commons-peygold/layout/ui-pey-layout/ui-pey-layout.component';
import {ScPeyUsersComponent} from './components/sc-pey-users/sc-pey-users.component';
import {ScPeyStoreUserComponent} from './components/sc-pey-store-user/sc-pey-store-user.component';
import {routes} from './routes';

export const config: Routes = [
  {
    path: routes.home,
    component: UIPeyLayoutComponent,
    canActivate: [GuardAuthService],
    children: [
      {
        path: routes.dashboard.index,
        component: ScPeyDashboardComponent,
        data: {
          title: 'Dashboard'
        },
      },
      {
        path: routes.users.index,
        component: ScPeyUsersComponent,
        data: {
          title: 'Seguridad: Usuarios'
        },
      },
      {
        path: routes.users.post,
        component: ScPeyStoreUserComponent,
        data: {
          title: 'Login Page'
        },
      },
      {
        path: routes.users.put,
        component: ScPeyStoreUserComponent,
        data: {
          title: 'Login Page'
        },
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(config, {
    scrollPositionRestoration: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class ScPeyGoldRouting {}
