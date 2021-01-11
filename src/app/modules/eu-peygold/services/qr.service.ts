import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Transaction, User, TransactionStatus, TransactionType } from '../../../models';
import { TransactionTypeEnum } from '../../../enums';

@Injectable({
  providedIn: 'root'
})
export class QrService extends HttpService {

  /**
   * create an qr payment
   */
  createQrPayment(transaction: any) {
    return this.post('/QR/cobro', { pagos: transaction }).toPromise();
  }

  /**
   * get qr payment pending
   */
  getQrPaymentPending(): Promise<Transaction> {
    let transaction = new Transaction();

    return this.get('/qr/cobro').toPromise().then(
      (resp: any) => {

        transaction.id = resp._id;
        transaction.receiver = new User();
        transaction.receiver.email = resp.receiver;
        transaction.status = new TransactionStatus(resp.estado);
        transaction.sender = new User();
        transaction.sender = resp.sender;
        transaction.createdAt = resp.fechaOperacionInicio;
        transaction.endAt = resp.fechaOperacionFinal;
        if (resp.objmonto && resp.objmonto.length > 0) {
          if (resp.objmonto.length == 1) {
            transaction.amount = resp.objmonto[0].monto;
            transaction.type = new TransactionType(resp.objmonto[0].tipoTransaccion);
          }
          if (resp.objmonto.length == 2) {
            transaction.type = new TransactionType(TransactionTypeEnum.MultyPey, 'MultyPey');
            transaction.multiPey = new Array<Transaction>();
            resp.objmonto.forEach(item => {
              const trans = new Transaction();
              trans.type = new TransactionType(item.tipoTransaccion);
              trans.amount = item.monto
              transaction.multiPey.push(trans);
            });
          }
        } else {
          transaction.amount = 0;
          transaction.type = new TransactionType('1');
        }

        return transaction;
      }
    ).catch(
      (error: any) => {
        console.log('error',error);
        return null;
      }
    );

  }

  /**
   * get qr payment pending to pay
  */
  getQrPaymentPendingToPay(receiverEmail:string): Promise<Transaction> {
    let transaction = new Transaction();

    return this.get('/qr/pago',{receiver:receiverEmail}).toPromise().then(
      (resp: any) => {

        transaction.id = resp._id;
        transaction.receiver = new User();
        transaction.receiver.email = resp.receiver;
        transaction.status = new TransactionStatus(resp.estado);
        transaction.sender = new User();
        transaction.sender = resp.sender;
        transaction.createdAt = resp.fechaOperacionInicio;
        transaction.endAt = resp.fechaOperacionFinal;
        if (resp.objmonto && resp.objmonto.length > 0) {
          if (resp.objmonto.length == 1) {
            transaction.amount = resp.objmonto[0].monto;
            transaction.type = new TransactionType(resp.objmonto[0].tipoTransaccion);
          }
          if (resp.objmonto.length == 2) {
            transaction.type = new TransactionType(TransactionTypeEnum.MultyPey, 'MultyPey');
            transaction.multiPey = new Array<Transaction>();
            resp.objmonto.forEach(item => {
              const transaction = new Transaction();
              transaction.type = new TransactionType(item.tipoTransaccion);
              transaction.amount = item.monto
              transaction.multiPey.push(transaction);
            });
          }
        } else {
          transaction.amount = 0;
          transaction.type = new TransactionType('1');
        }

        return transaction;
      }
    ).catch(
      (error: any) => {
        return null;
      }
    );
  }

  /**
   * process qr payment
   */
  processQrPayment(id:string, sender:string, transaction: any){
    return this.put('/qr/pago',{id:id, sender:sender, pagos:transaction}).toPromise();
  }

  /**
   * cancel qr payment paupending
   * @param id 
   */
  cancelQrPayment(id:string){
    return this.put('/qr/cobro/cancelar',{id:id}).toPromise();
  
  }

}
