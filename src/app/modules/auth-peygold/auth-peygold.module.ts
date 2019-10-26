import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeyLoginComponent } from './components/pey-login/pey-login.component';
import { AuthPeyGoldRouting } from './auth-peygold.routing';
import { PeyRegisterComponent } from './components/pey-register/pey-register.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [PeyLoginComponent, PeyRegisterComponent],
  imports: [
    CommonModule,
    AuthPeyGoldRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule
  ]
})
export class AuthPeyGoldModule { }
