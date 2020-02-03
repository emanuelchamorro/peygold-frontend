import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base.component';
import {CreditDestinationsService} from '../../services/credit-destinations.service';
import {CreditDestination, LoanRequest, SelectOption, LoanOption} from '../../../../models';

import { InMemoryService } from '../../../../services/in-memory.service';
import { LoansService } from '../../services/loans.service';
import {LoanFactory} from '../../../../factory/loan-factory';


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

  constructor(
    private creditDestinationsService: CreditDestinationsService,
    private inMemoryService:InMemoryService,
    private loanService: LoansService
  ) {
    super();
  }

  ngOnInit() {
    this.loanRequest = new LoanRequest();
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
  continue() {
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
    this.loanService.createLoan(LoanFactory.make(this.loanRequest,this.loanOption,this.rescueOption)).then(
      (resp:any)=>{
        this.loanRequest.id = resp.idLoan;
        this.unbusy();
        this.step++;
      }
    ).catch(
      (error:any)=>{
        this.unbusy();
      }
    );
  }

  
}
