import { Component, OnInit } from '@angular/core';
import {LoansService} from '../../services/loans.service';
import {Loan, TransactionType} from '../../../../models';
import {PaginationResponse} from '../../../commons-peygold/entities/pagination-response';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eu-pey-loan-requests',
  templateUrl: './eu-pey-loan-requests.component.html',
  styleUrls: ['./eu-pey-loan-requests.component.scss']
})
export class EuPeyLoanRequestsComponent implements OnInit {

  private loans: PaginationResponse;
  private loan: Loan;
  private loanDetail: Loan;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  constructor(
    private loansService: LoansService
  ) { }

  ngOnInit() {
    this.loansService.search(new TransactionType(),'@', 1, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos',response)
      this.loans = response;
      this.page = response.page;
      this.previousPage = 1;
      this.totalItems = response.count;
      console.log('count record',this.totalItems);
      this.showPagination = true;
    })
  }

  /**
   * Set te loan to see the loan info.
   * @param loan The loan object
   */
  private setLoan(loan: Loan) {
    this.loan = loan;
    this.loansService.getById(loan.id).then(
      (response:Loan) =>{
        this.loan = loan;
        this.loanDetail = response;
      }
    )
  }

  loadPage(page: number) {
    console.log('page',page);
    if (page !== this.previousPage) {
      this.previousPage = page-1;
      this.loansService.search(new TransactionType(),'@', page, environment.paginator.per_page).then((response: PaginationResponse) => {
        console.log('creditos',response)
        this.loans = response;
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        console.log('count record',this.totalItems);
        this.showPagination = true;
      })
    }
  }


}
