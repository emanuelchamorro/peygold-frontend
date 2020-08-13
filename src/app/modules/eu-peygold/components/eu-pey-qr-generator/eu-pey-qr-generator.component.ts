import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Transaction, User } from '../../../../models';
import { BaseComponent } from '../base.component';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { PDFExportComponent } from '@progress/kendo-angular-pdf-export';


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

  constructor(
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.user = this.authService.user();
    this.title = "¡Generaste tu código QR!";
    this.message = "Ya tienes tu código QR listo para usar. Ahora imprimilo y exponelo en tu comercio para comenzar a recibir pagos.";
    this.showImageBottom = false;
    this.buttonLabel = "Cobrar con QR";
    this.step = this.user.qrImage!=null && this.user.qrImage!=undefined  ? 2 : 1;
  }
  

  /**
   * generate codigo qr
   */
  generateQRCode() {

    this.user.qrImage="QR";
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
    <div style="width:100px; height:50px; background-color: red; display:block">
    </div>
          ${printContents}
        
     
         
    </body>
      </html>`
    );
    popupWin.document.close();
  }

  /**
   * ready to payment init page
   * @param result 
   */
  paymentRequestQR(result:any){
    this.step++;
  }

/**
 * set transaction
 * @param transaction 
 */
  setTransaction(transaction: Transaction) {
    transaction.receiver = this.user;
    this.transaction = transaction;
    console.log(transaction.toQR)
    this.step++;
  }

  /**
   * cancel resquest payment with qr code
   */
  cancelRequestPayment(){
    this.step = 2;
  }

}
