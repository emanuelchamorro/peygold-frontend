import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScPeyDashboardComponent} from './components/sc-pey-dashboard/sc-pey-dashboard.component';
import {GuardAuthService} from './services/guard-auth.service';
import {UIPeyLayoutComponent} from '../commons-peygold/layout/ui-pey-layout/ui-pey-layout.component';
import {UIPeyLayoutDashboardComponent} from '../commons-peygold/layout/ui-pey-layout-dashboard/ui-pey-layout-dashboard.component';
import {ScPeyUsersComponent} from './components/sc-pey-users/sc-pey-users.component';
import {ScPeyStoreUserComponent} from './components/sc-pey-store-user/sc-pey-store-user.component';
import {routes} from './routes';
import { ScPeyInsurancecarriersComponent } from './components/sc-pey-insurancecarriers/sc-pey-insurancecarriers.component';
import { ScPeyStoreInsurancecarrierComponent } from './components/sc-pey-store-insurancecarrier/sc-pey-store-insurancecarrier.component';
import { ScPeyBanksComponent } from './components/sc-pey-banks/sc-pey-banks.component';
import { ScPeyStoreBankComponent } from './components/sc-pey-store-bank/sc-pey-store-bank.component';
import { ScPeyRescueChecksComponent } from './components/sc-pey-rescue-checks/sc-pey-rescue-checks.component';
import { ScPeyStoreRescueCheckComponent } from './components/sc-pey-store-rescue-check/sc-pey-store-rescue-check.component';
import { ScPeyGeneralChargesCreditsComponent } from './components/sc-pey-general-charges-credits/sc-pey-general-charges-credits.component';
import { ScPeyStoreGeneralChargeCreditComponent } from './components/sc-pey-store-general-charge-credit/sc-pey-store-general-charge-credit.component';
import { ScPeyProvinceChargesCreditsComponent } from './components/sc-pey-province-charges-credits/sc-pey-province-charges-credits.component';
import { ScPeyStoreProvinceChargeCreditComponent } from './components/sc-pey-store-province-charge-credit/sc-pey-store-province-charge-credit.component';
import { ScPeyCreditManagementComponent } from './components/sc-pey-credit-management/sc-pey-credit-management.component';
import { ScPeyLoanAdministratorReviewComponent } from './components/sc-pey-loan-administrator-review/sc-pey-loan-administrator-review.component';
import { ScPeyLoanAdministratorCheckReviewComponent } from './components/sc-pey-loan-administrator-check-review/sc-pey-loan-administrator-check-review.component';
import { ScPeyLoanCompanyCreditRequestHistoryComponent } from './components/sc-pey-loan-company-credit-request-history/sc-pey-loan-company-credit-request-history.component';

export const config: Routes = [
  {
    path: routes.home.route,
    component: UIPeyLayoutDashboardComponent,
    canActivate: [GuardAuthService],
    children: [
      {
        path: routes.dashboard.index.route,
        component: ScPeyDashboardComponent,
        data: {
          title: 'Dashboard'
        },
      },
]
},
  
  {
    path: routes.home.route,
    component: UIPeyLayoutComponent,
    canActivate: [GuardAuthService],
    children: [
     
      {
        path: routes.users.index.route,
        component: ScPeyUsersComponent,
        data: {
          title: 'Seguridad: Usuarios'
        },
      },
      {
        path: routes.users.post.route,
        component: ScPeyStoreUserComponent,
        data: {
          title: 'Login Page'
        },
      },
      {
        path: routes.users.put.route,
        component: ScPeyStoreUserComponent,
        data: {
          title: 'Login Page'
        },
      },
      {
        path: routes.insurancecarriers.index.route,
        component: ScPeyInsurancecarriersComponent,
        data: {
          title: 'Catalogo: Aseguradoras'
        },
      },
      {
        path: routes.insurancecarriers.post.route,
        component: ScPeyStoreInsurancecarrierComponent,
        data: {
          title: 'Catalogo: Aseguradoras'
        },
      },
      {
        path: routes.insurancecarriers.put.route,
        component: ScPeyStoreInsurancecarrierComponent,
        data: {
          title: 'Catalogo: Aseguradoras'
        },
      },
      {
        path: routes.banks.index.route,
        component: ScPeyBanksComponent,
        data: {
          title: 'Catalogo: Bancos'
        },
      },
      {
        path: routes.banks.post.route,
        component: ScPeyStoreBankComponent,
        data: {
          title: 'Catalogo: Bancos'
        },
      },
      {
        path: routes.banks.put.route,
        component: ScPeyStoreBankComponent,
        data: {
          title: 'Catalogo: Bancos'
        },
      },
      {
        path: routes.rescuecheck.index.route,
        component: ScPeyRescueChecksComponent,
        data: {
          title: 'Catalogo: Rescate de cheques'
        },
      },
      {
        path: routes.rescuecheck.post.route,
        component: ScPeyStoreRescueCheckComponent,
        data: {
          title: 'Catalogo: Rescate de cheques'
        },
      },
      {
        path: routes.rescuecheck.put.route,
        component: ScPeyStoreRescueCheckComponent,
        data: {
          title: 'Catalogo: Rescate de cheques'
        },
      },
      {
        path: routes.generalchargescredits.index.route,
        component: ScPeyGeneralChargesCreditsComponent,
        data: {
          title: 'Catalogo: Cargo y abono general'
        },
      },
      {
        path: routes.generalchargescredits.post.route,
        component: ScPeyStoreGeneralChargeCreditComponent,
        data: {
          title: 'Catalogo: Cargo y abono general'
        },
      },
      {
        path: routes.generalchargescredits.put.route,
        component: ScPeyStoreGeneralChargeCreditComponent,
        data: {
          title: 'Catalogo: Cargo y abono general'
        },
      },
      {
        path: routes.provincechargescredits.index.route,
        component: ScPeyProvinceChargesCreditsComponent,
        data: {
          title: 'Catalogo: Cargo y abono por provincia'
        },
      },
      {
        path: routes.provincechargescredits.post.route,
        component: ScPeyStoreProvinceChargeCreditComponent,
        data: {
          title: 'Catalogo: Cargo y abono por provincia'
        },
      },
      {
        path: routes.provincechargescredits.put.route,
        component: ScPeyStoreProvinceChargeCreditComponent,
        data: {
          title: 'Catalogo: Cargo y abono por provincia'
        },
      },
      {
        path: routes.creditmanagement.index.route,
        component: ScPeyCreditManagementComponent,
        data: {
          title: 'Gestión de créditos: Solicitudes'
        },
      },
      {
        path: routes.loanadministratorreview.index.route,
        component: ScPeyLoanAdministratorReviewComponent,
        data: {
          title: 'Gestión de créditos: Análisis de riesgo'
        },
      },
      {
        path: routes.loanadministratorcheckreview.index.route,
        component: ScPeyLoanAdministratorCheckReviewComponent,
        data: {
          title: 'Gestión de créditos: Verificación de cheque'
        },
      },
      {
        path: routes.companycreditrequesthistory.index.route,
        component: ScPeyLoanCompanyCreditRequestHistoryComponent,
        data: {
          title: 'Gestión de créditos: Historial de empresa'
        },
      },
    ]
  },

]
@NgModule({
  imports: [ RouterModule.forRoot(config, {
    scrollPositionRestoration: 'enabled'
  }) ],
  exports: [ RouterModule ]
})
export class ScPeyGoldRouting {}
