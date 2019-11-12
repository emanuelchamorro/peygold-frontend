import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {AddMoneyTransaction} from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class MercadoPagoService extends HttpService {

  /**
   * Create a MercadoPago payment in the PeyGold platform
   * @param transaction The payment transaction.
   */
  createPayment(transaction: AddMoneyTransaction) {
    return this.post('/mercadopago', {
      CustomerEmail: transaction.customerEmail,
      Ammount: transaction.amount,
      Description: transaction.description,
      PaymentMethod: transaction.paymentMethod,
      CardToken: transaction.cardToken,
      idtransactiontype: transaction.idTransactionType,
    }).toPromise().then(() => true).catch(() => false);
  }
}
