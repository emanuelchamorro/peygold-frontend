import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base.component';
import {CreditDestinationsService} from '../../services/credit-destinations.service';
import {CreditDestination, LoanRequest, SelectOption, LoanOption} from '../../../../models';

import { InMemoryService } from '../../../../services/in-memory.service';
import { LoansService } from '../../services/loans.service';
import {LoanFactory} from '../../../../factory/loan-factory';
import { SelectOptionQuestion } from '../../../../models/select-option-question';
import { NgModel } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-eu-pey-loan-request',
  templateUrl: './eu-pey-loan-request.component.html',
  styleUrls: ['./eu-pey-loan-request.component.scss']
})
export class EuPeyLoanRequestComponent extends BaseComponent implements OnInit {

  private loanRequest: LoanRequest;
  private loanOption: LoanOption;
  private creditDestinations: Array<CreditDestination>;
  private rescueOptions:Array<SelectOption>;
  private rescueOption:SelectOption;
  private step = 1;
  public currentDate:Date = new Date();
  private selectOptionQuestion3:Array<SelectOptionQuestion>;
  private trySubmit = false;

  constructor(
    private creditDestinationsService: CreditDestinationsService,
    private inMemoryService:InMemoryService,
    private loanService: LoansService,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  ngOnInit() {
    this.loanRequest = new LoanRequest();
    this.selectOptionQuestion3 = this.inMemoryService.loadOptionsQuestions(3);
    this.creditDestinationsService.all().then(
      (creditDestinations) => this.creditDestinations = creditDestinations
    );
  }

  selectRescueOption(option: SelectOption): boolean {
    this.rescueOption = option;
    console.log('rescue option',this.rescueOption);
    return false;
  }

  /**
   * Go to next step
   */
  continue(validators?: Array<NgModel>) {
    if(this.step == 1){
      const valid = this.isValidFormModels(validators);

      if (! valid) {
        this.trySubmit = true;
        return;
      }

    }
    this.step++;
  }

  onContinue(event:LoanOption){
    this.loanOption = event;
    this.rescueOptions = this.inMemoryService.rescueOptions;
    this.continue();
  }

  /**
   * Go to previous step
   */
  back() {
    this.step--;
  }
  
  send(){
    this.busy();
    this.spinnerService.show();
    this.loanService.createLoan(LoanFactory.make(this.loanRequest,this.loanOption,this.rescueOption)).then(
      (resp:any)=>{
        this.loanRequest.id = resp.idLoan;
        this.spinnerService.hide();
        this.unbusy();
        this.step++;
      }
    ).catch(
      (error:any)=>{
        this.unbusy();
        this.spinnerService.hide();
      }
    );
  }

  
}
