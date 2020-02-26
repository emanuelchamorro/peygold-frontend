import { Component, OnInit } from '@angular/core';
import {Transaction, User} from '../../../../models';
import {Router} from '@angular/router';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {BaseComponent} from '../base.component';
import {TransactionsService} from '../../services/transactions.service';
import {Message} from '../../../commons-peygold/entities/message';
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eu-pey-money-send',
  templateUrl: './eu-pey-money-send.component.html',
  styleUrls: ['./eu-pey-money-send.component.scss']
})
export class EuPeyMoneySendComponent extends BaseComponent implements OnInit {

  public transaction: Transaction;

  private user: User;

  private step = 1;

  constructor(
    protected router: Router,
    private authService: AuthService,
    private transactionsService: TransactionsService,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.user = this.authService.user();
  }

  /**
   *
   */
  confirm(transaction: Transaction){
    this.transaction = transaction;
    this.step = 2;
  }

  /**
   * Send the payment transaction.
   */
  send() {
    this.submitted = true;
    if (! this.transaction.isValidToStart) {
      this.setError('No es posible realizar la transacción');
      this.submitted = false;
      return;
    }
    const optionSelected = this.transaction.type.isMultiPey ? 3 : 1;
   this.spinnerService.show();
    this.transactionsService.sendPayment(optionSelected,this.transaction).then(() => {
      this.spinnerService.hide();
      const  wallet = (this.transaction.type.label) ? this.transaction.type.label.toUpperCase() : '';
      this.showSuccessFeedback(new Message(
        '¡Enviaste dinero exitosamente!',
        `Hemos enviado el dinero a  <b>${this.transaction.receiver.completeName}</b> <br>` +
        `El importe se ha descontado de tu BILLETERA ${wallet}`
      ));
    }).catch((e: ErrorResponse) => {
      this.spinnerService.hide();
      this.submitted = false;
      const message = e.message || 'No es posible realizar la transacción';
      this.setError(message);
    });
  }
}
