import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScPeyGoldRouting} from './sc-peygold.routing';
import { ScPeyDashboardComponent } from './components/sc-pey-dashboard/sc-pey-dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ScPeyUsersComponent } from './components/sc-pey-users/sc-pey-users.component';
import { ScPeyShowUserComponent } from './components/sc-pey-show-user/sc-pey-show-user.component';
import { ScPeyStoreUserComponent } from './components/sc-pey-store-user/sc-pey-store-user.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';
import { ScPeyInsurancecarriersComponent } from './components/sc-pey-insurancecarriers/sc-pey-insurancecarriers.component';
import { ScPeyShowInsurancecarrierComponent } from './components/sc-pey-show-insurancecarrier/sc-pey-show-insurancecarrier.component';
import { ScPeyStoreInsurancecarrierComponent } from './components/sc-pey-store-insurancecarrier/sc-pey-store-insurancecarrier.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbPaginationModule, NgbAlertModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ExportAsModule } from 'ngx-export-as';
import { ScPeyBanksComponent } from './components/sc-pey-banks/sc-pey-banks.component';
import { ScPeyShowBankComponent } from './components/sc-pey-show-bank/sc-pey-show-bank.component';
import { ScPeyStoreBankComponent } from './components/sc-pey-store-bank/sc-pey-store-bank.component';
import { ScPeyRescueChecksComponent } from './components/sc-pey-rescue-checks/sc-pey-rescue-checks.component';
import { ScPeyStoreRescueCheckComponent } from './components/sc-pey-store-rescue-check/sc-pey-store-rescue-check.component';
import { ScPeyShowRescueCheckComponent } from './components/sc-pey-show-rescue-check/sc-pey-show-rescue-check.component';
import { ScPeyGeneralChargesCreditsComponent } from './components/sc-pey-general-charges-credits/sc-pey-general-charges-credits.component';
import { ScPeyStoreGeneralChargeCreditComponent } from './components/sc-pey-store-general-charge-credit/sc-pey-store-general-charge-credit.component';
import { ScPeyProvinceChargesCreditsComponent } from './components/sc-pey-province-charges-credits/sc-pey-province-charges-credits.component';
import { ScPeyStoreProvinceChargeCreditComponent } from './components/sc-pey-store-province-charge-credit/sc-pey-store-province-charge-credit.component';
import { ScPeyCreditManagementComponent } from './components/sc-pey-credit-management/sc-pey-credit-management.component';
import { ScPeyLoanComponent } from './components/sc-pey-loan/sc-pey-loan.component';
import { ScPeyLoanAdministratorReviewComponent } from './components/sc-pey-loan-administrator-review/sc-pey-loan-administrator-review.component';
import { ScPeyLoanAdministratorCheckReviewComponent } from './components/sc-pey-loan-administrator-check-review/sc-pey-loan-administrator-check-review.component';
import { ScPeyLoanCompanyCreditRequestHistoryComponent } from './components/sc-pey-loan-company-credit-request-history/sc-pey-loan-company-credit-request-history.component';
import { ScPeyLoanDetailComponent } from './components/sc-pey-loan-detail/sc-pey-loan-detail.component';
import { ScPeyLoanSettlementsComponent } from './components/sc-pey-loan-settlements/sc-pey-loan-settlements.component';
import { ScPeyLoanLiquidateComponent } from './components/sc-pey-loan-liquidate/sc-pey-loan-liquidate.component';
import { MustMatchDirective } from './directive/must-match.directive';


@NgModule({
  declarations: [
    ScPeyDashboardComponent,
    ScPeyUsersComponent,
    ScPeyShowUserComponent,
    ScPeyStoreUserComponent,
    ScPeyInsurancecarriersComponent,
    ScPeyShowInsurancecarrierComponent,
    ScPeyStoreInsurancecarrierComponent,
    ScPeyBanksComponent,
    ScPeyShowBankComponent,
    ScPeyStoreBankComponent,
    ScPeyRescueChecksComponent,
    ScPeyStoreRescueCheckComponent,
    ScPeyShowRescueCheckComponent,
    ScPeyGeneralChargesCreditsComponent,
    ScPeyStoreGeneralChargeCreditComponent,
    ScPeyProvinceChargesCreditsComponent,
    ScPeyStoreProvinceChargeCreditComponent,
    ScPeyCreditManagementComponent,
    ScPeyLoanComponent,
    ScPeyLoanAdministratorReviewComponent,
    ScPeyLoanAdministratorCheckReviewComponent,
    ScPeyLoanCompanyCreditRequestHistoryComponent,
    ScPeyLoanDetailComponent,
    ScPeyLoanSettlementsComponent,
    ScPeyLoanLiquidateComponent,
    MustMatchDirective
    
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    CommonModule,
    CommonsPeyGoldModule,
    ScPeyGoldRouting,
    NgxSpinnerModule,
    NgbPaginationModule,
    NgbDatepickerModule,
    ExportAsModule,
    NgbAlertModule
  ]
})
export class ScPeyGoldModule { }
