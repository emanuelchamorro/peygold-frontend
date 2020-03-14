import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../services/loans.service';
import { Loan, TransactionType } from '../../../../models';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import { BaseComponent } from '../base.component';
import { InsuranceCarrier } from '../../../../models/insurance-carrier';
import { Response } from '../../../../modules/commons-peygold/entities/response';

@Component({
  selector: 'app-sc-pey-loan-settlements',
  templateUrl: './sc-pey-loan-settlements.component.html',
  styleUrls: ['./sc-pey-loan-settlements.component.scss']
})
export class ScPeyLoanSettlementsComponent extends BaseComponent implements OnInit {


  private loans: PaginationResponse;
  private loan: Loan;
  private loanDetail: Loan;
  private idLoanSelected:number;
  

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter:string;

  constructor(private rout:Router,
    private loansService: LoansService,
    private spinnerService:NgxSpinnerService,
    private insuranceCarrierService:InsuranceCarrierService) { 
      super();
    }

  ngOnInit() {
    this.spinnerService.show();
    this.loansService.getLoanPending('@', 1, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos pendientes', response)
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
      this.spinnerService.hide();
    }).catch(
      (erro)=>{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible listar los crédito pendientes.");
      }
    );
  }

      /**
   * Set te loan to see the loan info.
   * @param loan The loan object
   */
  private setLoan(loan: Loan) {
    this.loan = loan;
    this.spinnerService.show();
    this.loansService.getById(loan.id).then(
      (response: Response) => {

        this.spinnerService.hide();
        if(response.ok){
          this.loan = loan;
          this.loanDetail = response.data;
        }else{
          this.setError(response.message);
        }
      }
    ).catch(
        (error)=>{
          this.spinnerService.hide();
          this.setError("Ha ocurrido un error. No será posible ver el detalle.");
        }
    );
  }

    /**
   * search loans by word
   * @param filter 
   */

  search(filter:string){
    console.log('filter',this.filter);
    if(this.filter.length>3){
      this.loadPage(1);
    }else if(this.filter.length == 0){
      this.filter = '';
      this.loadPage(1);
    }
  }

    /**
   * load page de loans
   * @param page 
   */

  loadPage(page: number) {
    let word = (this.filter && this.filter!='') ? this.filter: '@';

    console.log('word',word);
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.loansService.getLoanPending(word, page, environment.paginator.per_page).then((response: PaginationResponse) => {
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
      this.spinnerService.hide();
    }).catch(
      (erro)=>{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible listar los crédito pendientes.");
      }
    );
  }

  /**
   * Select loan to settlements
   * @param id 
   */
  selectLoan(id:number){
    this.idLoanSelected = id;
  }

  goToLiquidate(){
    if(this.idLoanSelected){
      this.rout.navigate([this.routes.loanliquidate.index.href,this.idLoanSelected]);
    }else{
      this.setError("Seleccione un crédito a liquidar.");
    }

  }

}
