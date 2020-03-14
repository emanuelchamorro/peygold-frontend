import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PePeygoldRouting } from './pe-peygold.routing';
import { PePeyLoanInsuranceReviewComponent } from './components/pe-pey-loan-insurance-review/pe-pey-loan-insurance-review.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonsPeyGoldModule } from '../commons-peygold/commons-peygold.module';


@NgModule({
  declarations: [PePeyLoanInsuranceReviewComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    CommonsPeyGoldModule,
    PePeygoldRouting,
    NgxSpinnerModule,
    NgbAlertModule
  ]
})
export class PePeygoldModule { }
