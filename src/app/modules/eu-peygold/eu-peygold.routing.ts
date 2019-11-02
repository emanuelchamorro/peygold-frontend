import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardAuthService} from './services/guard-auth.service';
import {UIPeyLayoutComponent} from '../commons-peygold/layout/ui-pey-layout/ui-pey-layout.component';
import {EuPeyDashboardComponent} from './components/eu-pey-dashboard/eu-pey-dashboard.component';
import {routes} from './routes';

export const config: Routes = [
  {
    path: routes.home,
    component: UIPeyLayoutComponent,
    canActivate: [GuardAuthService],
    children: [
      {
        path: routes.dashboard.index,
        component: EuPeyDashboardComponent,
        data: {
          title: 'Dashboard'
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
export class EuPeyGoldRouting {}
