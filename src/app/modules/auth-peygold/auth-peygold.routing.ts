import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PeyLoginComponent} from './components/pey-login/pey-login.component';
import {PeyRegisterComponent} from './components/pey-register/pey-register.component';
import {PeySuccessComponent} from './components/pey-success/pey-success.component';
import {PeyResetPasswordComponent} from './components/pey-reset-password/pey-reset-password.component';

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
      type: 'company'
    }
  },
  {
    path: 'register/institution',
    component: PeyRegisterComponent,
    data: {
      type: 'institution'
    }
  },
  {
    path: 'register/person',
    component: PeyRegisterComponent,
    data: {
      type: 'person'
    }
  },
  {
    path: 'register/success',
    component: PeySuccessComponent,
    data: {
      title: '¡Te registraste exitosamente!',
      message: '¡Bienvenidos a la comunidad Peygold!<br/>' +
        'Aprovechá al máximo nuestros servicios y obtené los mejores beneficios con nostros.',
    }
  },
  {
    path: 'reset-password',
    component: PeyResetPasswordComponent,
  },
  {
    path: 'reset-password/success',
    component: PeySuccessComponent,
    data: {
      title: '¡Contraseña restablecida!',
      message: '¡Has restablecido tu contraseña existosamente!<br/>' +
        '¡Ya podés iniciar sesión!',
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
