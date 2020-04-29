import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';
import { PgHelpRoutingModule } from './pg-help-routing.module';
import { HelpComponent } from './components/help/help.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { PeygoldQuestionsComponent } from './components/peygold-questions/peygold-questions.component';


@NgModule({
  declarations: [
    HelpComponent, 
    ContactUsComponent, 
    FrequentQuestionsComponent, 
    PeygoldQuestionsComponent
  ],
  imports: [
    CommonModule,
    CommonsPeyGoldModule,
    PgHelpRoutingModule
  ]
})
export class PgHelpModule { }
