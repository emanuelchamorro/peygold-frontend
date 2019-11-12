import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EuPeyGoldRouting} from './eu-peygold.routing';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';
import {EuPeyHomeComponent} from './components/eu-pey-home/eu-pey-home.component';
import {EuPeyMoneyAddComponent} from './components/eu-pey-money-add/eu-pey-money-add.component';
import {
  EuPeyMoneyAddByBankTransferComponent
} from './components/eu-pey-money-add-by-bank-transfer/eu-pey-money-add-by-bank-transfer.component';
import {
  EuPeyMoneyAddByBankDepositComponent
} from './components/eu-pey-money-add-by-bank-deposit/eu-pey-money-add-by-bank-deposit.component';
import {EuPeyMoneyAddByCreditCardComponent} from './components/eu-pey-money-add-by-credit-card/eu-pey-money-add-by-credit-card.component';
import {EuPeyMoneyAddByCashComponent} from './components/eu-pey-money-add-by-cash/eu-pey-money-add-by-cash.component';
import {EuPeyMoneyAddAmountFormComponent} from './components/eu-pey-money-add-amount-form/eu-pey-money-add-amount-form.component';
import {MercadoPagoModule} from '../mercado-pago/mercado-pago.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import {NgMaskConfig} from '../../config';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    EuPeyHomeComponent,
    EuPeyMoneyAddComponent,
    EuPeyMoneyAddByBankTransferComponent,
    EuPeyMoneyAddByBankDepositComponent,
    EuPeyMoneyAddByCreditCardComponent,
    EuPeyMoneyAddByCashComponent,
    EuPeyMoneyAddAmountFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonsPeyGoldModule,
    EuPeyGoldRouting,
    MercadoPagoModule,
    NgxMaskModule.forRoot(NgMaskConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      },
    })
  ]
})
export class EuPeyGoldModule { }
