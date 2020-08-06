import { Component, OnInit } from '@angular/core';
import { Transaction, User } from '../../../../models';
import { BaseComponent } from '../base.component';
import { AuthService } from '../../../auth-peygold/services/auth.service';


@Component({
  selector: 'app-eu-pey-qr-generator',
  templateUrl: './eu-pey-qr-generator.component.html',
  styleUrls: ['./eu-pey-qr-generator.component.scss']
})
export class EuPeyQrGeneratorComponent extends BaseComponent implements OnInit {

  private user: User;
  public step:number;
  private transaction: Transaction;


  private title: string;
  private message: string;
  private showImageBottom: boolean;
  private buttonLabel: string;

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
