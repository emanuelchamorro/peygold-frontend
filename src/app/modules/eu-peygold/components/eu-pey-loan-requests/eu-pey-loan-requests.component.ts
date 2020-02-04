import { Component, OnInit } from '@angular/core';
import {LoansService} from '../../services/loans.service';
import {Loan, TransactionType} from '../../../../models';
import {PaginationResponse} from '../../../commons-peygold/entities/pagination-response';

@Component({
  selector: 'app-eu-pey-loan-requests',
  templateUrl: './eu-pey-loan-requests.component.html',
  styleUrls: ['./eu-pey-loan-requests.component.scss']
})
export class EuPeyLoanRequestsComponent implements OnInit {

  private loans: PaginationResponse;
  private loan: Loan;

  constructor(
    private loansService: LoansService
  ) { }

  ngOnInit() {
    this.loansService.search(new TransactionType()).then((response: PaginationResponse) => {
      console.log('creditos',response)
      this.loans = response;
    });
  }

  /**
   * Set te loan to see the loan info.
   * @param loan The loan object
   */
  private setLoan(loan: Loan) {
    this.loan = loan;
  }
}
