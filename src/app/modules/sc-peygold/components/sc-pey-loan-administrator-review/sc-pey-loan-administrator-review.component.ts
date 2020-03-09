import { Component, OnInit } from '@angular/core';
import { Loan, SelectOption, Check } from '../../../../models';
import { LoansService } from '../../services/loans.service';
import { NgxSpinnerService } from "ngx-spinner";
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { InsuranceCarrier } from '../../../../models/insurance-carrier';
import { every } from 'rxjs/operators';



@Component({
  selector: 'app-sc-pey-loan-administrator-review',
  templateUrl: './sc-pey-loan-administrator-review.component.html',
  styleUrls: ['./sc-pey-loan-administrator-review.component.scss']
})
export class ScPeyLoanAdministratorReviewComponent extends BaseComponent implements OnInit {

  private idLoan:number;
  public loanDetail: Loan;
  public insurancesCarriers: Array<SelectOption>;
  public insuranceCarrierSelected:SelectOption;
  public submited:boolean;


  constructor(private route:ActivatedRoute,
              private loansService: LoansService,
              private spinnerService:NgxSpinnerService,
              private insuranceCarrierService:InsuranceCarrierService
  ) {
    super();
    this.idLoan = Number( this.route.snapshot.paramMap.get("idLoan")); 
  }

  ngOnInit() {

    this.spinnerService.show();
    this.loansService.getById(this.idLoan).then(
      (response: Loan) => { 
        this.loanDetail = response;
        
        this.insuranceCarrierService.getById(Number(this.loanDetail.insuranceCarrier.value)).then(
          (insuranceCarrier:InsuranceCarrier)=>{
            this.spinnerService.hide();
            this.loanDetail.insuranceCarrier.label = insuranceCarrier.socialReason;
            console.log('loanDetail',this.loanDetail);
            this.insuranceCarrierService.all().then((insurancesCarriers: Array<SelectOption>) => {
              this.insurancesCarriers = insurancesCarriers;
              this.verifiedInformation(this.loanDetail.checks);
              console.log('aseguradoras',this.insurancesCarriers);
            });
          }          
        ).catch(
          (error)=>{
            this.spinnerService.hide();
            this.setError("Ha ocurrido un error. No será posible ver el detalle de la solicitud.");
          }
          
        )
       
      }
    );



  }

  changeRisky(flag:boolean){
    this.loanDetail.riskySituation = flag;
    this.spinnerService.show();
    this.loansService.updateRiskySituation(this.loanDetail).then(
      (resp)=>{
        this.spinnerService.hide();
        this.setSuccess("La solicitud fué enviada a la aseguradora.");
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No fué posible cambiar la situación crediticia");
        console.log("error",error); 
      }
    );
  }

  refuse(loan:Loan){
    console.log("La solicitud ha sido rechazado");
    this.spinnerService.show();
    this.loansService.updateAdminVerification(this.loanDetail,3).then(
      (resp)=>{
        this.spinnerService.hide();
        this.setSuccess("La solicitud fué rechazada exitosamente.");
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No fué posible rechazar la solicitud");
        console.log("error",error); 
      }
    );

  }

  private verifiedInformation(checks:Array<Check>){
    this.loanDetail.verifiedInformation = checks.every((check) => check.checkStatusUpdate == 2);
  }

  onSubmit(loan:Loan){
    this.submited = true;

    if(!this.loanDetail.riskySituation){
      this.setError("Debe indicar la situación crediticia.");
      return;
    } 
    if(!this.loanDetail.verifiedInformation){
      this.setError("Debe verificar la información de todos los cheques.");
      return;
    }  
  
    this.spinnerService.show();
    this.loansService.updateLoanInformation(this.loanDetail).then(
      (resp)=>{        
        this.loansService.updateAdminVerification(this.loanDetail,2).then(
          (resp)=>{
            const creditDetailId = this.loanDetail.checks[0].loanCreditDetailId;
            this.loansService.sendCreditRequest(creditDetailId).then(
              (resp)=>{
                console.log('resp send solicitud a la aseguradora',resp);
                this.spinnerService.hide();
                this.setSuccess("La solicitud fué enviada a la aseguradora.");
              }
            ).catch(
              (error)=>{
                console.log('error en send solicitud a la aseguradora',error);
                this.spinnerService.hide();
                this.setError("Ha ocurrido un error. No fué posible enviar la solicitud a la aseguradora");
              }
            );
          }
        ).catch(
          (error)=>{
            this.spinnerService.hide();
            this.setError("Ha ocurrido un error. No fué posible aprobar la solicitud posterior a su revisión.");
            console.log("error",error); 
          }
        );        
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No fué posible actualizar la información de la solicitud.");
        console.log("error",error); 
      }
    );
  }

}
