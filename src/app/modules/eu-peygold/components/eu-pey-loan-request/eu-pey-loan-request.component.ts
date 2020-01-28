import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base.component';
import {CreditDestinationsService} from '../../services/credit-destinations.service';
import {Bank, CreditDestination, LoanRequest} from '../../../../models';
import {BanksService} from '../../services/banks.service';

@Component({
  selector: 'app-eu-pey-loan-request',
  templateUrl: './eu-pey-loan-request.component.html',
  styleUrls: ['./eu-pey-loan-request.component.scss']
})
export class EuPeyLoanRequestComponent extends BaseComponent implements OnInit {

  private loanRequest: LoanRequest;
  private creditDestinations: Array<CreditDestination>;
  private step = 1;

  constructor(
    private creditDestinationsService: CreditDestinationsService
  ) {
    super();
  }

  ngOnInit() {
    this.loanRequest = new LoanRequest();
    this.creditDestinationsService.all().then(
      (creditDestinations) => this.creditDestinations = creditDestinations
    );
  }

  /**
   * Go to next step
   */
  continue() {
    this.step++;
  }

  /**
   * Go to previous step
   */
  back() {
    this.step--;
  }
}
