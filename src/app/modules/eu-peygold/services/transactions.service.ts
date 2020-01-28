import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Transaction, TransactionStatus, TransactionType, User} from '../../../models';
import {map} from 'rxjs/operators';
import { Constants } from '../../utils/constants';

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
            transaction.symbol = Constants.symbolsArray[item.idTransactionType-1];

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

  sendPayment(paymentType:number,transaction: Transaction){
    let url:string;
    let payment;
    if(paymentType!=3){
      url = '/transactions';
      payment = {
        ammount: transaction.amount,
        sender: transaction.sender.email,
        receiver: transaction.receiver.email,
        message: transaction.reason,
        idtransactiontype: transaction.type.value
      }
    }else{
      url = '/transactions/CreateMultiPay';
      const payment1={
        Idtransactiontype:transaction.multiPey[0].type.value,
        Ammount:transaction.multiPey[0].amount
      }
      const payment2={
        Idtransactiontype:transaction.multiPey[1].type.value,
        Ammount:transaction.multiPey[1].amount
      }
      payment = {
        Receiver: transaction.receiver.email,
        Message:transaction.reason,
        PayDTOs:[payment1,payment2]
      }
    }
    console.log('payment en el servicio',payment)
    return this.post(url,payment).toPromise();
  }
}
