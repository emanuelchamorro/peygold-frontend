import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PeyLoginComponent} from './pey-login/pey-login.component';

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
    }
  },
  // {
  //  path: 'register',
  //  component: PeyRegisterComponent,
  //  data: {
  //    title: 'Register Page'
  //  }
  // },
  // { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AuthPeyGoldRouting {}
