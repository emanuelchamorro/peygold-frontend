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
import { EuPeyMoneyRequestComponent } from './components/eu-pey-money-request/eu-pey-money-request.component';
import { EuPeyMoneyRequestsComponent } from './components/eu-pey-money-requests/eu-pey-money-requests.component';
import { EuPeyMoneySendComponent } from './components/eu-pey-money-send/eu-pey-money-send.component';
import { EuPeyMoneySentComponent } from './components/eu-pey-money-sent/eu-pey-money-sent.component';
import { EuPeyUserComponent } from './components/eu-pey-user/eu-pey-user.component';
import { EuPeyLoanRequestsComponent } from './components/eu-pey-loan-requests/eu-pey-loan-requests.component';
import { EuPeyLoanRequestComponent } from './components/eu-pey-loan-request/eu-pey-loan-request.component';
import { EuPeyLoanComponent } from './components/eu-pey-loan/eu-pey-loan.component';
import {
  EuPeyLoanRequestChecksFormComponent
} from './components/eu-pey-loan-request-checks-form/eu-pey-loan-request-checks-form.component';
import { EuPeyQrGeneratorComponent } from './components/eu-pey-qr-generator/eu-pey-qr-generator.component';
import { EuPeyQrScannerComponent } from './components/eu-pey-qr-scanner/eu-pey-qr-scanner.component';
import { QRCodeModule } from 'angular2-qrcode';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { NgQRCodeReaderModule } from 'ng2-qrcode-reader';
import {NgbDatepickerModule, NgbPaginationModule, NgbPaginationConfig, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { EuPeyLoanHelpComponent } from './components/eu-pey-loan-help/eu-pey-loan-help.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { EuPeyQrScannerConfirmComponent } from './components/eu-pey-qr-scanner-confirm/eu-pey-qr-scanner-confirm.component';
import { CardsComponent } from './components/cards/cards.component';
import {MustMatchDirective} from './directive/must-match.directive';

@NgModule({
  declarations: [
    EuPeyHomeComponent,
    EuPeyMoneyAddComponent,
    EuPeyMoneyAddByBankTransferComponent,
    EuPeyMoneyAddByBankDepositComponent,
    EuPeyMoneyAddByCreditCardComponent,
    EuPeyMoneyAddByCashComponent,
    EuPeyMoneyAddAmountFormComponent,
    EuPeyMoneyRequestComponent,
    EuPeyMoneyRequestsComponent,
    EuPeyMoneySendComponent,
    EuPeyMoneySentComponent,
    EuPeyUserComponent,
    EuPeyLoanRequestsComponent,
    EuPeyLoanRequestComponent,
    EuPeyLoanComponent,
    EuPeyLoanRequestChecksFormComponent,
    EuPeyQrGeneratorComponent,
    EuPeyQrScannerComponent,
    EuPeyLoanHelpComponent,
    EuPeyQrScannerConfirmComponent,
    MustMatchDirective,
    CardsComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonsPeyGoldModule,
    EuPeyGoldRouting,
    MercadoPagoModule,
    QRCodeModule,
    NgQrScannerModule,
    NgQRCodeReaderModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgxSpinnerModule,
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
  ],
  providers: [NgbPaginationConfig]
})
export class EuPeyGoldModule { }
