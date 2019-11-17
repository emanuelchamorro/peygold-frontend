import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Transaction, TransactionStatus, TransactionType, User} from '../../../models';
import {ApiResponse} from '../../../services/api-response';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends HttpService {

  /**
   * Search transactions.
   * @return Promise<Array<Transaction>> the list of transaction
   */
  search(): Promise<Array<Transaction>> {
    return this.get('/transactions/search/@/0/1/10')
      .pipe(
        map((response) => {
          return response.value.map((item: any) => {
            const transaction = new Transaction();

            transaction.id = item.idTransactionHistory;
            transaction.createdAt = item.dateAndTime;
            transaction.amount = item.amount || item.ammount;
            transaction.sender = new User();

            transaction.sender.email = item.emailSender;
            transaction.sender.fullName = item.fullNameSender;
            transaction.sender.fullName = item.fullNameSender;

            if (item.receiver) {
              transaction.receiver = new User();
              transaction.receiver.id = item.receiver.idUser;
              transaction.receiver.idAspNetUser = item.receiver.idAspNetUser;
              transaction.receiver.name = item.receiver.firstName;
              transaction.receiver.lastName = item.receiver.lastName;
              transaction.receiver.email = item.receiver.email;
              transaction.receiver.phone = item.receiver.phone;
              transaction.receiver.avatarURL = item.receiver.avatarURL;
              transaction.receiver.fullName = item.receiver.fullName;
              transaction.receiver.idUserType = item.receiver.idUserType;
            }

            transaction.messages = item.message;
            transaction.reason = item.reason;
            transaction.type = new TransactionType(item.idTransactionType);
            transaction.commissionPercentaje = item.commissionPercentaje;
            transaction.commissionAmmount = item.commissionAmmount;
            transaction.idOriginRecharge = item.idOriginRecharge;
            transaction.originRechargeName = item.originRechargeName;

            return transaction;
          });
      }
      )).toPromise();
  }

  /**
   * Start a Send money transaction
   * @return Promise
   */
  create(transaction: Transaction) {
    return this.post('/transactions', {
      ammount: transaction.amount,
      sender: transaction.sender.email,
      receiver: transaction.receiver.email,
      message: transaction.reason,
      idtransactiontype: transaction.type.value
    }).toPromise();
  }
}
