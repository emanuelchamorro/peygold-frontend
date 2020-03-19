import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { NgxSpinnerService } from "ngx-spinner";
import { LoansService } from '../../services/loans.service';
import { TransactionType, Loan } from '../../../../models';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sc-pey-loan-company-credit-request-history',
  templateUrl: './sc-pey-loan-company-credit-request-history.component.html',
  styleUrls: ['./sc-pey-loan-company-credit-request-history.component.scss']
})
export class ScPeyLoanCompanyCreditRequestHistoryComponent extends BaseComponent implements OnInit {

  private idUser:number;
  private loans: PaginationResponse;

  private loansApprove: Array<any>;
  private loansReject: Array<any>;


  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public socialReason: string;

  constructor(private route:ActivatedRoute,
              private loansService: LoansService,
              private spinnerService: NgxSpinnerService, ) {
      super();
      this.idUser = Number(this.route.snapshot.paramMap.get("idUser"));
      this.socialReason = this.route.snapshot.paramMap.get("socialReason");
  }

  ngOnInit() {
    this.spinnerService.show();
    this.loansService.getLoanProcess(this.idUser, '@', 1, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.loans = response;

      if (this.loans.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
        this.loansApprove = this.loans.data.filter((item)=>item.status.value=='2');
        this.loansReject = this.loans.data.filter((item)=>item.status.value=='3');
        console.log('loansApprove', this.loansApprove)
        console.log('loansReject', this.loansReject)
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

}
