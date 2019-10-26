import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PeyLoginComponent} from './components/pey-login/pey-login.component';
import {PeyRegisterComponent} from './components/pey-register/pey-register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: PeyLoginComponent,
    data: {
      title: 'Login Page'
    },
  },
  {
    path: 'register',
    component: PeyRegisterComponent,
    data: {
      title: 'Register Person',
    }
  },
  {
    path: 'register/company',
    component: PeyRegisterComponent,
    data: {
      title: 'Register Company',
      type: 'company'
    }
  },
  {
    path: 'register/institution',
    component: PeyRegisterComponent,
    data: {
      title: 'Register Institution',
      type: 'institution'
    }
  },
  {
    path: 'register/person',
    component: PeyRegisterComponent,
    data: {
      title: 'Register Person',
      type: 'person'
    }
  },
  // { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class AuthPeyGoldRouting {}
