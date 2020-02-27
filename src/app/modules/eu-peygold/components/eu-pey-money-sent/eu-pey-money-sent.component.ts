import { Component, OnInit } from '@angular/core';
import { Transaction, TransactionStatus } from '../../../../models';
import { RequestTransactionsService } from '../../services/request-transactions.service';
import { TransactionStatusEnum } from '../../../../enums';
import { Message } from '../../../commons-peygold/entities/message';
import { ErrorResponse } from '../../../commons-peygold/entities/error-response';
import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private requestTransactionsService: RequestTransactionsService,
    private spinnerService: NgxSpinnerService
  ) {
    super();
    this.transactions = new Array<Transaction>();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.requestTransactionsService.pending()
      .then(
        (transactions: Array<Transaction>) => {
          this.spinnerService.hide();
          this.transactions = transactions
        }).catch(
          (error)=>{
            this.spinnerService.hide();
            this.catchError(error);
          });
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
      this.selectedTransaction.processedComments = status.id == '2' ? "Se aprueba solicitu de pago" : "Se rechaza solicitud de pago"
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
    this.spinnerService.show();
    this.requestTransactionsService.update(this.selectedTransaction).then(() => {

      let message = this.selectedTransaction.status.value == '2' ? new Message(
        '¡El pago fue enviado!',
        `Has pagado exitosamente a <b>${this.selectedTransaction.receiver.completeName}</b>. ` +
        'El importe fue descontado de tus billeteras Peygold, veras las operaciones reflejadas en "Movimientos"'
      ) : new Message(
        '¡El pago fue enviado!',
        `Rechazaste la solicitud de pago de <b>${this.selectedTransaction.receiver.completeName} y </b>. ` +
        'ya no aparecerá como pendiente.'
      );
      this.spinnerService.hide();
      this.showSuccessFeedback(message);
    }).catch((e: ErrorResponse) => {
      this.spinnerService.hide();
      this.submitted = false;
      const message = e.message || 'No es posible realizar la transacción';
      this.setError(message);
    });
  }
}
