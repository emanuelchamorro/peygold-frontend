import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../services/loans.service';
import { Loan, TransactionType } from '../../../../models';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import { InsuranceCarrier } from '../../../../models/insurance-carrier';
import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';
import { Response } from '../../../../modules/commons-peygold/entities/response';

@Component({
  selector: 'app-sc-pey-credit-management',
  templateUrl: './sc-pey-credit-management.component.html',
  styleUrls: ['./sc-pey-credit-management.component.scss']
})
export class ScPeyCreditManagementComponent extends BaseComponent implements OnInit {

  private loans: PaginationResponse;
  private loan: Loan;
  private loanDetail: Loan;


  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;
  public selectFilter: string;

  constructor(private rout: Router,
    private loansService: LoansService,
    private spinnerService: NgxSpinnerService,
    private insuranceCarrierService: InsuranceCarrierService) {
    super();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.loansService.search(new TransactionType(), '@', 1, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.loans = response;

      if (this.loans.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible listar las solicitudes procesadas.");
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
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible ver el detalle.");
      }
    );
  }

  /**
   * set filter 
   * @param filter 
   */

  setFilter(filter: string) {
    this.filter = '';
    this.selectFilter = filter;
    this.loadPage(1);
  }

  /**
   * search loans by word
   * @param filter 
   */

  search(filter: string) {
    console.log('filter', this.filter);
    this.selectFilter = '';
    if (this.filter.length > 3) {
      this.loadPage(1);
    } else if (this.filter.length == 0) {
      this.filter = '';
      this.selectFilter = '';
      this.loadPage(1);
    }
  }

  deleteLoan(loan: Loan) {
    this.spinnerService.show();
    this.loansService.getById(loan.id).then(
      (response: Response) => {

        if(response.ok){
          const loanDetail = response.data;
          if (loanDetail.insuranceLoan) {
            this.loansService.deleteLoanInsurance(loanDetail.insuranceLoan.id).then(
              (resp) => {
                console.log('resp', resp);
                this.loansService.updateAdminVerification(loanDetail, 1).then(
                  (resp) => {
                    this.spinnerService.hide();
                    this.setSuccess("La solicitud de la aseguradora fué eliminada exitosamente.");
                    this.loadPage(this.page);
                  }
                ).catch(
                  (error) => {
                    this.spinnerService.hide();
                    this.setError("Ha ocurrido un error. No fué posible eliminar la solicitud de la aseguradora");
                    console.log("error", error);
                  }
                );
  
              }
            ).catch(
              (error) => {
                console.log('error', error);
                this.spinnerService.hide();
                this.setError("Ha ocurrido un error. No fué posible eliminar la solicitud de la aseguradora.");
              }
            );
          } else {
            this.loansService.updateAdminVerification(loanDetail, 1).then(
              (resp) => {
                this.spinnerService.hide();
                this.setSuccess("La solicitud de la aseguradora fué eliminada exitosamente.");
              }
            ).catch(
              (error) => {
                this.spinnerService.hide();
                this.setError("Ha ocurrido un error. No fué posible eliminar la solicitud de la aseguradora");
                console.log("error", error);
              }
            );
          }
        }else{
          this.setError(response.message);
        }   
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No fué posible eliminar la solicitud de la aseguradora.");
      }
    );
  }

  /**
   * load page de loans
   * @param page 
   */

  loadPage(page: number) {

    let word = (this.selectFilter && this.selectFilter != '') ? this.selectFilter : (this.filter && this.filter != '') ? this.filter : '@';
    console.log('word', word);
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.loansService.search(new TransactionType(), word, page, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.loans = response;

      if (this.loans.data.length) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        console.log('count record', this.totalItems);
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible listar las solicitudes de crédito.");
      }
    );
  }
  /**
   * 
   * @param id of loan
   */
  goToDetail(id: number) {
    this.spinnerService.show();
    this.loansService.getById(id).then(
      (response: Response) => {
        this.spinnerService.hide();
        if(response.ok){
          this.loanDetail = response.data;
          this.rout.navigate([this.routes.loandetail.index.href, this.loanDetail.insuranceLoan.id]);
        }else{
          this.setError(response.message);
        }
        
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible ver el detalle del crédito.");
      }

    );
  }

}
