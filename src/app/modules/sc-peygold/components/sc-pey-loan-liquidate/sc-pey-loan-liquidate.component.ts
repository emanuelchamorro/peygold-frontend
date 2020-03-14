import { Component, OnInit } from '@angular/core';
import { Loan, SelectOption, Check, LoanStatus } from '../../../../models';
import { LoansService } from '../../services/loans.service';
import { NgxSpinnerService } from "ngx-spinner";
import { InsuranceCarrierService } from '../../services/insurance-carrier.service';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { Response } from '../../../../modules/commons-peygold/entities/response';

@Component({
  selector: 'app-sc-pey-loan-liquidate',
  templateUrl: './sc-pey-loan-liquidate.component.html',
  styleUrls: ['./sc-pey-loan-liquidate.component.scss']
})
export class ScPeyLoanLiquidateComponent extends BaseComponent implements OnInit {

  private idLoan:number;
  public loanDetail: Loan;
  public insurancesCarriers: Array<SelectOption>;
  public insuranceCarrierSelected:SelectOption;
  public submited:boolean;
  public userAccount:any={};
  public password:string;
  public repeatPasswordInput:string;
  public tokenInput:string;
  public status:number;

  constructor(private route:ActivatedRoute,
    private loansService: LoansService,
    private spinnerService:NgxSpinnerService,
    private insuranceCarrierService:InsuranceCarrierService) { 
      super();
      this.idLoan = Number( this.route.snapshot.paramMap.get("idLoan")); 
    }

  ngOnInit() {
    this.userAccount = localStorage.getItem("hsu")?JSON.parse(atob(localStorage.getItem("hsu"))):undefined;
    this.repeatPasswordInput = null;
    this.tokenInput = null;
    this.spinnerService.show();
    this.loansService.getById(this.idLoan).then(
      (response: Response) => { 
        this.spinnerService.hide();
        if(response.ok){
          this.loanDetail = response.data;
          console.log('loanDetail',this.loanDetail );
          this.insuranceCarrierService.all().then((insurancesCarriers: Array<SelectOption>) => {
            this.insurancesCarriers = insurancesCarriers;
            console.log('aseguradoras',this.insurancesCarriers);
          });
        }else{
          this.setError(response.message);
        }
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No será posible ver el detalle de la solicitud.");
      }      
    );
  }

  sendToken(){
    this.spinnerService.show();
    this.loansService.sendToken().then(
      (resp)=>{
        this.spinnerService.hide();
        console.log('resp send token',resp);
        this.setSuccess('El token fué enviado a su correo exitosamente.');
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        console.log('error send token',error);
        this.setError('Ha ocurrido un error. No fué posible enviar el token a su correo.');
      }
    )
  }

  onSubmit(){
    console.log('token',this.tokenInput);
    console.log('status',this.status);
    this.spinnerService.show();
    this.loanDetail.status = new LoanStatus(String(this.status));
    this.loansService.processLoan(this.loanDetail,this.tokenInput).then(
      (resp)=>{
        this.spinnerService.hide();
        console.log('resp send token',resp);
        this.setSuccess('El token fué enviado a su correo exitosamente.');
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        console.log('error send token',error);
        if(error.code==404){
          this.setError('Ha ocurrido un error. El Token no existe o ya fue usado.');
        }else{
          this.setError('Ha ocurrido un error. No fué posible enviar el token a su correo.');
        }
        
      }
    )
  }



}
