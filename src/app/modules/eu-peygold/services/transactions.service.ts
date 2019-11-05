import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Transaction, User} from '../../../models';
import {ApiResponse} from '../../../services/api-response';


@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends HttpService {

  /**
   * Search transactions.
   */
  search(): Promise<Array<Transaction>> {
    return this.get('/transactions/search/@/0/1/10')
      .toPromise().then((response: ApiResponse) => response.value.map((transaction: any) => {
          const mTransaction = new Transaction();

          mTransaction.id = transaction.idTransactionHistory;
          mTransaction.dateTime = transaction.dateAndTime;
          mTransaction.amount = transaction.amount || transaction.ammount;
          mTransaction.sender = new User();

          mTransaction.sender.email = transaction.emailSender;
          mTransaction.sender.fullName = transaction.fullNameSender;
          mTransaction.sender.fullName = transaction.fullNameSender;

          if (transaction.receiver) {
            mTransaction.receiver = new User();
            mTransaction.receiver.id = transaction.receiver.idUser;
            mTransaction.receiver.idAspNetUser = transaction.receiver.idAspNetUser;
            mTransaction.receiver.name = transaction.receiver.firstName;
            mTransaction.receiver.lastName = transaction.receiver.lastName;
            mTransaction.receiver.email = transaction.receiver.email;
            mTransaction.receiver.phone = transaction.receiver.phone;
            mTransaction.receiver.avatarURL = transaction.receiver.avatarURL;
            mTransaction.receiver.fullName = transaction.receiver.fullName;
            mTransaction.receiver.idUserType = transaction.receiver.idUserType;
          }

          mTransaction.messages = transaction.message;
          mTransaction.reason = transaction.reason;
          mTransaction.type = transaction.idTransactionType;
          mTransaction.commissionPercentaje = transaction.commissionPercentaje;
          mTransaction.commissionAmmount = transaction.commissionAmmount;
          mTransaction.idOriginRecharge = transaction.idOriginRecharge;
          mTransaction.originRechargeName = transaction.originRechargeName;

          return mTransaction;
        })
      );
  }
}
