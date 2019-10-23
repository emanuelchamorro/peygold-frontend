import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeyLoginComponent } from './pey-login/pey-login.component';
import { AuthPeyGoldRouting } from './auth-peygold.routing';
import { PeyRegisterComponent } from './pey-register/pey-register.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [PeyLoginComponent, PeyRegisterComponent],
  imports: [
    CommonModule,
    AuthPeyGoldRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthPeyGoldModule { }
