import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { LoansService } from '../../services/loans.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Loan, SelectOption, LoanStatus } from '../../../../models';
import { InMemoryService } from '../../../../services';
import { DataFile } from 'src/app/models/data-file';
import { Response } from '../../../../modules/commons-peygold/entities/response';

@Component({
  selector: 'app-pe-pey-loan-insurance-review',
  templateUrl: './pe-pey-loan-insurance-review.component.html',
  styleUrls: ['./pe-pey-loan-insurance-review.component.scss']
})
export class PePeyLoanInsuranceReviewComponent extends BaseComponent implements OnInit {

  private loanInsuranceId:string;
  private loanDetail:Loan;
  private statusOptions: Array<LoanStatus>;
  private pFile:File;

  constructor(private route:ActivatedRoute,
              private loansService:LoansService,
              private spinnerService:NgxSpinnerService,
              private inMemoryService:InMemoryService) {
    super();
    this.loanInsuranceId = this.route.snapshot.paramMap.get("idLoanInsurance");

  }

  ngOnInit() {
    this.spinnerService.show();
    this.statusOptions = this.inMemoryService.loadStatus;
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
        this.setError("Ha ocurrido un error. No será posible ver el detalle de la solicitud.");
      }      
    );
  }

  public uploadImage($event: Event): void {
    let file:File =  $event.target[`files`][0]
     
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result: string = reader.result as string;
      let data = '';
 
      if (result.includes(',')) {
        data = result.split(',')[1] || '';
        this.loanDetail.policyFile = new DataFile();
        this.loanDetail.policyFile.name = file.name;
        this.loanDetail.policyFile.data = data;
        this.loanDetail.policyFile.mimeType = 'application/pdf';
        
      }
    };
    reader.onerror = (error) => {
      console.log(error);
    };    
   }


  onSubmit(loan:Loan){

    if(loan.insuranceStatus.value != '1'){
      this.spinnerService.show();
      this.loansService.changeStatusLoanInsurance(loan).then(
        (resp)=>{
          this.spinnerService.hide();
          this.setSuccess('La solicitud fué procesada exitosamente.');
          console.log('changeStatusLoanInsurance service success',resp);
        }
      ).catch(
        (error)=>{
          this.spinnerService.hide();
          this.setError('Ha ocurrido un error. No fué posible procesar la solicitud.');
          console.log('changeStatusLoanInsurance service error',error);
        }
      );
    }else{
      this.setError('Debe aprobar o rechazar la solicitud.');
    }

  }

}
