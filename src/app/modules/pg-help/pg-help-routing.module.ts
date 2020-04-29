import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UiPeyHelpLayoutComponent } from '../commons-peygold/layout/ui-pey-help-layout/ui-pey-help-layout.component';
import { GuardAuthService } from '../eu-peygold/services/guard-auth.service';
import { routes } from './routes';
import { HelpComponent } from './components/help/help.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { PeygoldQuestionsComponent } from './components/peygold-questions/peygold-questions.component';


const config: Routes = [
  {
    path: routes.index.route,
    component: UiPeyHelpLayoutComponent,
    canActivate: [GuardAuthService],
    children: [
      {
        path: '',
        component: HelpComponent
      },
      {
        path: routes.cantactus.route,
        component: ContactUsComponent
      },
      {
        path: routes.frequentquestions.route,
        component: FrequentQuestionsComponent
      },
      {
        path: routes.peygoldquestions.route,
        component: PeygoldQuestionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(config, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class PgHelpRoutingModule { }
