import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../services/loans.service';
import { Loan, TransactionType } from '../../../../models';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
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
  public filter:string;
  public selectFilter:string;

  constructor(
    private loansService: LoansService
  ) { }

  ngOnInit() {
   // this.filter = '';
   // this.selectFilter = '';
    this.loansService.search(new TransactionType(), '@', 1, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.loans = response;
      if(this.loans.data.length>0){
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
      }else{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
    }).catch(
      (erro)=>{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
    );
  }

  /**
   * Set te loan to see the loan info.
   * @param loan The loan object
   */
  private setLoan(loan: Loan) {
    this.loan = loan;
    this.loansService.getById(loan.id).then(
      (response: Loan) => {
        this.loan = loan;
        this.loanDetail = response;
      }
    )
  }

  setFilter(filter:string){
    this.filter = '';
    this.selectFilter = filter;
    this.loadPage(1);
  }

  search(filter:string){
    console.log('filter',this.filter);
    this.selectFilter = '';
    if(this.filter.length>3){
      this.loadPage(1);
    }else if(this.filter.length == 0){
      this.filter = '';
      this.selectFilter = '';
      this.loadPage(1);
    }
  }

  loadPage(page: number) {
    console.log('selectFilter',this.selectFilter);
    console.log('filter',this.filter);
    let word = (this.selectFilter && this.selectFilter!='') ? this.selectFilter : (this.filter && this.filter!='') ? this.filter: '@' ;
    console.log('word',word);
    this.previousPage = page - 1;
    this.loansService.search(new TransactionType(), word, page, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.loans = response;
      if(this.loans.data.length){
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        console.log('count record', this.totalItems);
        this.showPagination = true;
      }else{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
    }).catch(
      (erro)=>{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
    )

  }


}
