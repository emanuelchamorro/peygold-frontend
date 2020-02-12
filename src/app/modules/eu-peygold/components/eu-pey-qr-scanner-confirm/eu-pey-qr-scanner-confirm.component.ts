import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionType, User } from 'src/app/models';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { TransactionsService } from '../../services/transactions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eu-pey-qr-scanner-confirm',
  templateUrl: './eu-pey-qr-scanner-confirm.component.html',
  styleUrls: ['./eu-pey-qr-scanner-confirm.component.scss']
})
export class EuPeyQrScannerConfirmComponent implements OnInit {

  step: number = 1;
  public decode: any;
  private user: User;

  constructor(    private authService: AuthService,
    private transactionsService: TransactionsService,
    private route:ActivatedRoute) {
      this.route.queryParams.subscribe((p)=>{
        console.log(p.qr);
        this.decode = JSON.parse(p.qr);
        console.log(this.decode);
      });
    }

  ngOnInit() {
    this.user = this.authService.user();
  }


  proccess(qrDecode: any) {
    const optionSelected = qrDecode.payments.length > 1 ? 3 : 1;
    this.transactionsService.sendPayment(optionSelected, this._paymentMapper(qrDecode)).then(
      (resp) => {
        this.step++;
      }
    ).catch(
      (error) => {
        console.log('error', error);
      }
    )
  }

  _paymentMapper(dataDecode: any) {
    const optionSelected = dataDecode.payments.length > 1 ? 3 : 1;
    let payment: any;
    if (optionSelected !== 3) {
      payment = new Transaction();
      payment.type = new TransactionType(dataDecode.payments[0].idTransactionType);
      payment.amount = dataDecode.payments[0].ammount;
      payment.sender = new User();
      payment.sender.email = this.user.email;
      payment.receiver = new User();
      payment.receiver.email = dataDecode.email;
      payment.reason = 'Pago por codigo QR'
    } else {
      payment = new Transaction();
      payment.multiPey = new Array<Transaction>();

      let payment1 = new Transaction();
      payment1.type = new TransactionType(dataDecode.payments[0].idTransactionType);
      payment1.amount = dataDecode.payments[0].ammount;

      let payment2 = new Transaction();
      payment2.type = new TransactionType(dataDecode.payments[1].idTransactionType);
      payment2.amount = dataDecode.payments[1].ammount;

      payment.multiPey.push(payment1);
      payment.multiPey.push(payment2);

      payment.receiver = new User();
      payment.receiver.email = dataDecode.email;
      payment.reason = 'Pago por codigo QR'
    }
    console.log('payment', payment);
    return payment;

  }


  back() {
    this.step--;
  }

  send() {
    this.proccess(this.decode);
  }

}
