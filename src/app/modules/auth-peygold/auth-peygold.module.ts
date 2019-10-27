import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeyLoginComponent } from './components/pey-login/pey-login.component';
import { AuthPeyGoldRouting } from './auth-peygold.routing';
import { PeyRegisterComponent } from './components/pey-register/pey-register.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PeySuccessComponent } from './components/pey-success/pey-success.component';
import { PeyResetPasswordComponent } from './components/pey-reset-password/pey-reset-password.component';

@NgModule({
  declarations: [
    PeyLoginComponent,
    PeyRegisterComponent,
    PeySuccessComponent,
    PeyResetPasswordComponent],
  imports: [
    CommonModule,
    AuthPeyGoldRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbAlertModule
  ]
})
export class AuthPeyGoldModule { }
