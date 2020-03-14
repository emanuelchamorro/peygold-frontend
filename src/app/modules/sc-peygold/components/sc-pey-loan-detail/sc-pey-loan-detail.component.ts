import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { LoansService } from '../../services/loans.service';
import { NgxSpinnerService } from "ngx-spinner";
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import { ActivatedRoute } from '@angular/router';
import { Loan, SelectOption, Check } from '../../../../models';
import { Response } from '../../../../modules/commons-peygold/entities/response';

@Component({
  selector: 'app-sc-pey-loan-detail',
  templateUrl: './sc-pey-loan-detail.component.html',
  styleUrls: ['./sc-pey-loan-detail.component.scss']
})
export class ScPeyLoanDetailComponent extends BaseComponent implements OnInit {

  private loanInsuranceId:string;
  public loanDetail: Loan;
  public insurancesCarriers: Array<SelectOption>;

  constructor(private route:ActivatedRoute,
    private loansService: LoansService,
    private spinnerService:NgxSpinnerService,
    private insuranceCarrierService:InsuranceCarrierService) {
    super();
    this.loanInsuranceId = this.route.snapshot.paramMap.get("idLoan");
  }

  ngOnInit() {
    this.spinnerService.show();
    this.loansService.getLoanInsuranceById(this.loanInsuranceId).then(
      (response: Response) => { 

        this.spinnerService.hide();
        if(response.ok){
          this.loanDetail = response.data;
        }else{
          this.setError(response.message);
        }      
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible ver el detalle del crédito.");
      }
      
    );
  }

}
