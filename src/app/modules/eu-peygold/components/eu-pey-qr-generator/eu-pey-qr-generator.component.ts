import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Transaction, User } from '../../../../models';
import { BaseComponent } from '../base.component';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';
import { NgxSpinnerService } from 'ngx-spinner';
import { QrService } from '../../../eu-peygold/services/qr.service';
import { TransactionFactory } from '../../../../factory/transaction-factory';


@Component({
  selector: 'app-eu-pey-qr-generator',
  templateUrl: './eu-pey-qr-generator.component.html',
  styleUrls: ['./eu-pey-qr-generator.component.scss']
})
export class EuPeyQrGeneratorComponent extends BaseComponent implements OnInit {

  //@ViewChild('contentQr',{static:false}) contentQr: ElementRef;

  private user: User;
  public step:number;
  private transaction: Transaction;
  
  private title: string;
  private message: string;
  private showImageBottom: boolean;
  private buttonLabel: string;
  public changeClass:boolean = true;
  public indicateAmount:boolean;
  

  constructor(
    private authService: AuthService,
    private qrService: QrService,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  ngOnInit() {
    this.user = this.authService.user();
    this.user.qrImage = this.authService.isGenerateQr();
    this.spinnerService.show();
    this.qrService.getQrPaymentPending().then(
      (transPending:Transaction)=>{
        console.log(transPending);
        if(!transPending){
          this.step = this.user.qrImage!=null && this.user.qrImage!=undefined && this.user.qrImage  ? 2 : 1;
        }else{
          this.transaction = transPending;
          this.validateIfIndicateAmount();
          this.step = 3;
        }
        this.spinnerService.hide();

      }
    );
  }
  

  /**
   * generate codigo qr
   */
  generateQRCode() {

    this.user.qrImage=true;
    this.authService.setGenerateQR(this.user.qrImage);
    this.step++;
  }


  printQR(contentQr:HTMLDivElement){
    let printContents, popupWin;
    //console.log(innerHtml)
    printContents  = contentQr.innerHTML;

    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
         
          </style>
        </head>
    <body onload="window.print();window.close()">
    <div  style="width: 400px; border: 1px dashed black;">
      <img src="/assets/images/Tijera.svg" width="30" style="position: absolute; top: -12px;
              right: 20px;">
      <div style="padding: 15px 15px 45px 15px; margin: auto; background-color: #3575BA; text-align: center;">

        <img src="/assets/images/logo peygold.svg" width="120">

        <h2 style="color: white; font-size: 29px!important; text-transform: uppercase;margin-top: 25px;
                margin-bottom: 35px; letter-spacing: 1px;">Pagá desde <br> tu celular</h2>
          ${printContents}
        
   
     </div>
     <div style="background-color: white; display: inline-block; width: 100%; padding: 15px;">
     <span style="margin-right: 15px;     font-size: 14px;">Con las apps de:</span>
     <img src="/assets/images/peygold-logo-black.svg" width="90" style="margin-right: 15px;">
     <img src="/assets/images/tienda-pey.svg" width="90">
   </div>
   <div style="background-color: white; width: 400px; margin: auto; text-align: center; padding: 10px;">
     <span style="font-size: 10px; ">CUIL 30495883049 - CONFORTSUR S.A</span>
   </div>
   </div>      
    </body>
      </html>`
    );
    popupWin.document.close();
  }

/**
 * set transaction
 * @param transaction 
 */
  setTransaction(transaction: Transaction) {
    transaction.receiver = this.user;
    this.transaction = transaction;
    this.validateIfIndicateAmount();
    this.spinnerService.show();
    this.qrService.createQrPayment(TransactionFactory.makeTransactionToEntity(transaction,this.indicateAmount)).then(
      (resp)=>{
        this.spinnerService.hide();
         this.step++;        
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error, no fué posible procesar el cobro qr.')
        console.log(error);
      }
    );
    
  }

  /**
   * cancel resquest payment with qr code
   */
  cancelRequestPayment(){

    if(this.transaction && this.transaction.id){
      this.spinnerService.show();
      this.qrService.cancelQrPayment(this.transaction.id).then(
        (resp)=>{
          this.transaction = null;
          console.log(resp);
          this.spinnerService.hide();
          this.step = 2;
        }
        ).catch(
          (error)=>{
            console.log(error)
            this.spinnerService.hide();
            this.setError('Ha ocurrido un error, no fué posible cancelar el cobro qr.');
          }
        );
    }else{
      this.spinnerService.show();
      this.qrService.getQrPaymentPending().then(
        (transPending:Transaction)=>{
          console.log(transPending);
          this.qrService.cancelQrPayment(transPending.id).then(
            (resp)=>{
              this.transaction = null;
              console.log(resp)
              this.spinnerService.hide();
              this.step = 2;
            }
            ).catch(
              (error)=>{
                console.log(error)
                this.spinnerService.hide();
                this.setError('Ha ocurrido un error, no fué posible cancelar el cobro qr.');
              }
            );
  
        }
      );
    }



  }
/**
 * validate if indicate amount
 */
  validateIfIndicateAmount(){
    if(!this.transaction.type.isMultiPey){
      this.indicateAmount = this.transaction.amount > 0 ? true : false; 
    }else{
      let resultValidate = new Array<boolean>();
      this.transaction.multiPey.forEach(trans => {
        resultValidate.push(trans.amount > 0 ? true : false);
      });
      this.indicateAmount = resultValidate[0] && resultValidate[1];
    }
  }

}
