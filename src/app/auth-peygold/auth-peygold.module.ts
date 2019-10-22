import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeyLoginComponent } from './pey-login/pey-login.component';
import { AuthPeyGoldRouting } from './auth-peygold.routing';



@NgModule({
  declarations: [PeyLoginComponent],
  imports: [
    CommonModule,
    AuthPeyGoldRouting
  ]
})
export class AuthPeyGoldModule { }
