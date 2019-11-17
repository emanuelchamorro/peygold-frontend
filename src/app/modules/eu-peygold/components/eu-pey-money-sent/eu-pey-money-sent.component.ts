import { Component, OnInit } from '@angular/core';
import {Transaction, TransactionStatus} from '../../../../models';
import {RequestTransactionsService} from '../../services/request-transactions.service';
import {TransactionStatusEnum} from '../../../../enums';
import {Message} from '../../../commons-peygold/entities/message';
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import {BaseComponent} from '../base.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-eu-pey-money-sent',
  templateUrl: './eu-pey-money-sent.component.html',
  styleUrls: ['./eu-pey-money-sent.component.scss']
})
export class EuPeyMoneySentComponent extends BaseComponent implements OnInit {

  private transactions: Array<Transaction>;

  private selectedTransaction: Transaction;

  private transactionStatus = TransactionStatusEnum;

  private confirmStatus = false;

  constructor(
    protected router: Router,
    private requestTransactionsService: RequestTransactionsService
  ) {
    super();
    this.transactions = new Array<Transaction>();
  }

  ngOnInit() {
    this.requestTransactionsService.pending()
      .then((transactions: Array<Transaction>) => this.transactions = transactions);
  }

  /**
   * Set the transaction to be paid.
   * @param transaction The selected transaction.
   */
  setTransaction(transaction: Transaction) {
    this.selectedTransaction = transaction;
  }

  /**
   * Confirm chenge the status of the transaction.
   * @param statusId the status identifier
   * @return void
   */
  confirm(statusId: string) {
    this.cleanErrors();
    if (this.selectedTransaction) {
       const status = new TransactionStatus(statusId);
       this.selectedTransaction.status = status;
       this.confirmStatus = true;
    }
  }

  /**
   * Cancel processing transaction.
   * @return void
   */
  cancel() {
    if (this.selectedTransaction) {
      this.selectedTransaction.status = null;
    }
    this.confirmStatus = false;
  }

  /**
   * Proccess the transaction.
   * @return void;
   */
  update() {
    this.submitted = true;
    this.selectedTransaction.reason = '';
    this.requestTransactionsService.update(this.selectedTransaction).then(() => {
      this.showSuccessFeedback(new Message(
        '¡El pago fue enviado!',
        `Has pagado exitosamente a Aiunk y <b>${this.selectedTransaction.receiver.completeName}</b>. ` +
        'El importe fue descontado de tus billeteras Peygold, veras las operaciones reflejadas en "Movimientos"'
      ));
    }).catch((e: ErrorResponse) => {
      this.submitted = false;
      const message = e.message || 'No es posible realizar la transacción';
      this.setError(message);
    });
  }
}
