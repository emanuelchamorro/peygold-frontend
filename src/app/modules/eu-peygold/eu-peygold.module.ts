import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EuPeyGoldRouting} from './eu-peygold.routing';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';
import {EuPeyHomeComponent} from './components/eu-pey-home/eu-pey-home.component';
import {EuPeyMoneyAddComponent} from './components/eu-pey-money-add/eu-pey-money-add.component';
import {EuPeyMoneyAddByBankTransferComponent} from './components/eu-pey-money-add-by-bank-transfer/eu-pey-money-add-by-bank-transfer.component';
import {EuPeyMoneyAddByBankDepositComponent} from './components/eu-pey-money-add-by-bank-deposit/eu-pey-money-add-by-bank-deposit.component';
import {EuPeyMoneyAddByCreditCardComponent} from './components/eu-pey-money-add-by-credit-card/eu-pey-money-add-by-credit-card.component';
import {EuPeyMoneyAddByCashComponent} from './components/eu-pey-money-add-by-cash/eu-pey-money-add-by-cash.component';
import {EuPeyMoneyAddAmountFormComponent} from './components/eu-pey-money-add-amount-form/eu-pey-money-add-amount-form.component';

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
    CommonsPeyGoldModule,
    EuPeyGoldRouting
  ]
})
export class EuPeyGoldModule { }
