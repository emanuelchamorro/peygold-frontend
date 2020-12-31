import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Transaction, TransactionType, User} from '../../../models';
import {map} from 'rxjs/operators';
import {TransactionStatus} from '../../../models/transaction-status';
import { Constants } from '../../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class RequestTransactionsService extends HttpService {

  /**
   * Get the all request transactions
   * @param transaction The payment transaction.
   * @return Promise<Array<Transaction>>
   */
  all(status?: string): Promise<Array<Transaction>> {
    const resource =  status ? `/requesttransactions/${status}` : '/requesttransactions';
    return this.get(resource)
      .pipe(
        map((transactions: Array<any>) => transactions.map(
          (transaction) => this.castTransaction(transaction))
        )
      )
      .toPromise()
      .catch(() => []);
  }

  /**
   * Get the pending transactions
   * @param transaction The payment transaction.
   * @return Promise<Array<Transaction>>
   */
  pending(): Promise<Array<Transaction>> {
    return this.all('pending');
  }

  /**
   * Map any object to a Transaction model
   * @param transaction the object
   * @return Transaction
   */
  private castTransaction(transaction: any): Transaction {
    const mTransaction = new Transaction();

    mTransaction.id = transaction.requestTransactionId;
    mTransaction.receiver = new User();
    mTransaction.receiver.id = transaction.idUserRequest;
    mTransaction.receiver.email = transaction.emailRequest;
    mTransaction.receiver.fullName = transaction.requestName;
    mTransaction.sender = new User();
    mTransaction.sender.fullName = transaction.senderName;
    mTransaction.sender.email = transaction.emailSender;
    mTransaction.amount = transaction.amount || transaction.ammount;
    mTransaction.reason = transaction.requestComments;
    mTransaction.createdAt = transaction.transactionDate;
    mTransaction.status = new TransactionStatus(transaction.processedStatus);
    mTransaction.processedAt = transaction.transactionDate;
    mTransaction.processedComments = transaction.processedComments;
    mTransaction.type = new TransactionType(transaction.idTransactionType);
    mTransaction.symbol = Constants.symbolsArray[transaction.idTransactionType-1];
    return mTransaction;
  }

  /**
   * Start a Request money transaction
   * @return Promise
   */
  create(transaction: Transaction) {
    debugger;
    let url: string;
    let payment;
    if(transaction.type.value != '999'){

      url = '/requesttransactions';
      payment = {
        Ammount: transaction.amount,
        IdUserSender: transaction.sender.id,
        IdTransactionType : transaction.type.value,
        RequestComments: transaction.reason
      }

    }else{
      url = '/requesttransactions/CreateMultipay';
      const payment1 = {
        Idtransactiontype: transaction.multiPey[0].type.value,
        Ammount: transaction.multiPey[0].amount
      }
      const payment2 = {
        Idtransactiontype: transaction.multiPey[1].type.value,
        Ammount: transaction.multiPey[1].amount
      }
      payment = {
        idSender: transaction.sender.id,
        RequestComments: transaction.reason,
        PayDTOs: [payment1, payment2]
      }
    }

    return this.post(url, payment).toPromise();

  }


  /**
   * Update a Request money transaction
   * @return Promise
   */
  update(transaction: Transaction) {
    return this.put(`/requesttransactions`, {
      RequestTransactionId: transaction.id,
      ProcessedStatus: parseInt(transaction.status.value),
      ProcessedComments: transaction.processedComments
    }).toPromise();
  }
}
