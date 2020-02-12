import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuardAuthService} from './services/guard-auth.service';
import {UIPeyLayoutComponent} from '../commons-peygold/layout/ui-pey-layout/ui-pey-layout.component';
import {EuPeyHomeComponent} from './components/eu-pey-home/eu-pey-home.component';
import {routes} from './routes';
import {EuPeyMoneyAddComponent} from './components/eu-pey-money-add/eu-pey-money-add.component';
import {
  EuPeyMoneyAddByBankTransferComponent
} from './components/eu-pey-money-add-by-bank-transfer/eu-pey-money-add-by-bank-transfer.component';
import {
  EuPeyMoneyAddByBankDepositComponent
} from './components/eu-pey-money-add-by-bank-deposit/eu-pey-money-add-by-bank-deposit.component';
import {EuPeyMoneyAddByCreditCardComponent} from './components/eu-pey-money-add-by-credit-card/eu-pey-money-add-by-credit-card.component';
import {EuPeyMoneyAddByCashComponent} from './components/eu-pey-money-add-by-cash/eu-pey-money-add-by-cash.component';
import {config as CommonsRoutes } from '../commons-peygold/commons-peygold.routing';
import {EuPeyMoneyRequestComponent} from './components/eu-pey-money-request/eu-pey-money-request.component';
import {EuPeyMoneyRequestsComponent} from './components/eu-pey-money-requests/eu-pey-money-requests.component';
import {EuPeyMoneySendComponent} from './components/eu-pey-money-send/eu-pey-money-send.component';
import {EuPeyMoneySentComponent} from './components/eu-pey-money-sent/eu-pey-money-sent.component';
import {EuPeyUserComponent} from './components/eu-pey-user/eu-pey-user.component';
import {EuPeyLoanRequestsComponent} from './components/eu-pey-loan-requests/eu-pey-loan-requests.component';
import {EuPeyLoanRequestComponent} from './components/eu-pey-loan-request/eu-pey-loan-request.component';
import {EuPeyQrGeneratorComponent} from './components/eu-pey-qr-generator/eu-pey-qr-generator.component';
import {EuPeyQrScannerComponent} from './components/eu-pey-qr-scanner/eu-pey-qr-scanner.component';
import { EuPeyQrScannerConfirmComponent } from './components/eu-pey-qr-scanner-confirm/eu-pey-qr-scanner-confirm.component';

export const config: Routes = [
  {
    path: routes.index.route,
    component: UIPeyLayoutComponent,
    canActivate: [GuardAuthService],
    children: [
      // Commons Routes
      ... CommonsRoutes,
      // HOME ROUTES
      {
        path: routes.home.route,
        component: EuPeyHomeComponent,
      },
      // END HOME ROUTES
      // ADD MONEY
      {
        path: routes.money.add.route,
        component: EuPeyMoneyAddComponent,
      },
      {
        path: routes.money.add.bank_transfer.route,
        component: EuPeyMoneyAddByBankTransferComponent,
      },
      {
        path: routes.money.add.bank_deposit.route,
        component: EuPeyMoneyAddByBankDepositComponent,
      },
      {
        path: routes.money.add.credit_card.route,
        component: EuPeyMoneyAddByCreditCardComponent,
      },
      {
        path: routes.money.add.cash.route,
        component: EuPeyMoneyAddByCashComponent,
      },
      // END ADD MONEY
      // REQUEST MONEY
      {
        path: routes.money.request.route,
        component: EuPeyMoneyRequestComponent,
      },
      // END REQUEST MONEY
      // REQUEST MONEY
      {
        path: routes.money.send.route,
        component: EuPeyMoneySendComponent,
      },
      {
        path: routes.money.sent.route,
        component: EuPeyMoneySentComponent,
      },
      // END REQUEST MONEY
      // QR
      {
        path: routes.qr.generator.route,
        component: EuPeyQrGeneratorComponent,
      },
      {
        path: routes.qr.scanner.route,
        component: EuPeyQrScannerComponent,
      },
      {
        path: routes.qr.confirm.route,
        component: EuPeyQrScannerConfirmComponent,
      },
      // END QR
      // LOANS
      {
        path: routes.loans.index.route,
        component: EuPeyLoanRequestsComponent,
      },
      {
        path: routes.loans.request.route,
        component: EuPeyLoanRequestComponent,
      },
      // END LOANS
      // USER
      {
        path: routes.me.index.route,
        component: EuPeyUserComponent,
      },
      // END USER
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(config, {
    scrollPositionRestoration: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class EuPeyGoldRouting {}
