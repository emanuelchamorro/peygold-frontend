import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MercadoPago} from './services/mercado-pago.service';



@NgModule({
  providers: [
    MercadoPago
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class MercadoPagoModule { }
