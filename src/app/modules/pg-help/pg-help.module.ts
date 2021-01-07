import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';
import { PgHelpRoutingModule } from './pg-help-routing.module';
import { HelpComponent } from './components/help/help.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FrequentQuestionsComponent } from './components/frequent-questions/frequent-questions.component';
import { PeygoldQuestionsComponent } from './components/peygold-questions/peygold-questions.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


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
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    PgHelpRoutingModule,
    NgbAlertModule,
    NgxSpinnerModule
  ]
})
export class PgHelpModule { }
