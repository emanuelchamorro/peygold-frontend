import {NgModule} from '@angular/core';
import {routes} from './routes';
import {RouterModule, Routes} from '@angular/router';
import {PeyLoginComponent} from './components/pey-login/pey-login.component';
import {PeyRegisterComponent} from './components/pey-register/pey-register.component';
import {PeySuccessComponent} from './components/pey-success/pey-success.component';
import {PeyResetPasswordComponent} from './components/pey-reset-password/pey-reset-password.component';
import {LogoutService} from './services/logout.service';

export const config: Routes = [
  {
    path: '',
    redirectTo: routes.login,
    pathMatch: 'full',
  },
  {
    path: routes.login,
    component: PeyLoginComponent,
    data: {
      title: 'Login Page'
    },
  },
  {
    path: routes.logout,
    canActivate: [LogoutService],
    component: PeyLoginComponent,
  },
  {
    path: routes.register.index,
    component: PeyRegisterComponent,
    data: {
      title: 'Register Person',
    }
  },
  {
    path: routes.register.company,
    component: PeyRegisterComponent,
    data: {
      type: 'company'
    }
  },
  {
    path: routes.register.institution,
    component: PeyRegisterComponent,
    data: {
      type: 'institution'
    }
  },
  {
    path: routes.register.person,
    component: PeyRegisterComponent,
    data: {
      type: 'person'
    }
  },
  {
    path: routes.register.success,
    component: PeySuccessComponent,
    data: {
      title: '¡Te registraste exitosamente!',
      message: '¡Bienvenidos a la comunidad Peygold!<br/>' +
        'Aprovechá al máximo nuestros servicios y obtené los mejores beneficios con nostros.',
    }
  },
  {
    path: routes.reset_password.index,
    component: PeyResetPasswordComponent,
  },
  {
    path: routes.reset_password.success,
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
  imports: [ RouterModule.forRoot(config, {
    scrollPositionRestoration: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class AuthPeyGoldRouting {}
