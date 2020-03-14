import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { routes } from '../pe-peygold/routes';
import { config as CommonsRoutes } from '../commons-peygold/commons-peygold.routing';
import { UiPePeyLayoutComponent } from '../commons-peygold/layout/ui-pe-pey-layout/ui-pe-pey-layout.component';
import { PePeyLoanInsuranceReviewComponent } from './components/pe-pey-loan-insurance-review/pe-pey-loan-insurance-review.component';


const config: Routes = [
  {
    path: routes.index.route,
    component: UiPePeyLayoutComponent,
    children: [
      // Commons Routes
      ...CommonsRoutes,
      {
        path: routes.loaninsuranceview.route,
        component: PePeyLoanInsuranceReviewComponent,
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(config, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class PePeygoldRouting { }
