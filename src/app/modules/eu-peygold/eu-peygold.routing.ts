import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardAuthService} from './services/guard-auth.service';
import {UIPeyLayoutComponent} from '../commons-peygold/layout/ui-pey-layout/ui-pey-layout.component';
import {EuPeyHomeComponent} from './components/eu-pey-home/eu-pey-home.component';
import {routes} from './routes';

export const config: Routes = [
  {
    path: routes.index.route,
    component: UIPeyLayoutComponent,
    canActivate: [GuardAuthService],
    children: [
      {
        path: routes.home.route,
        component: EuPeyHomeComponent,
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
