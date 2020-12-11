import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Transaction, TransactionStatus, TransactionType, User } from '../../../models';
import { map } from 'rxjs/operators';
import { Constants } from '../../utils/constants';
import { OriginTransactionType } from 'src/app/models/origin-transaction-type';
import { environment } from '../../../../environments/environment';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends HttpService {

  /**
   * Search transactions.
   * @return Promise<Array<Transaction>> the list of transaction
   */
  search(page: number, perPage: number): Promise<Array<Transaction>> {
    return this.get(`/transactions/search/@/0/${page}/${perPage}`)
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
            transaction.symbol = Constants.symbolsArray[item.idTransactionType - 1];

            return transaction;
          });
        }
        )).toPromise();
  }


  /**
 * Search generic transactions.
 * @return Promise<PaginationResponse> the list of transaction
 */
  searchGenericTransaction(params: any, user: User): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(params.Page, params.Size);
    return this.post('/transactions/GetGenericsTransactions', params).toPromise().then(

      (response: any) => {
        paginator.count = response.recordCount;
        paginator.data = response.getTransactionDTOs.map((item: any) => {
          const transaction = new Transaction();

          transaction.id = item.idTransactionHistory;
          transaction.createdAt = item.dateAndTime;
          transaction.amount = item.amount || item.ammount;

          //Sender
          transaction.sender = new User();
          transaction.sender.id = item.idSender;
          transaction.sender.email = item.emailSender;
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
            transaction.receiver.active = item.receiver.active;
            transaction.receiver.documentNumber = item.receiver.dni;
            transaction.receiver.cuit = item.receiver.cuit;
            transaction.receiver.systemUserTypeId = item.receiver.systemUserTypeId;
          }

          transaction.messages = item.message;
          transaction.reason = item.reason;
          transaction.type = new TransactionType(item.idTransactionType);
          transaction.commissionPercentaje = item.commissionPercentaje;
          transaction.commissionAmmount = item.commissionAmmount;
          transaction.originRecharge = new OriginTransactionType(item.idOriginRecharge, item.originRechargeName);
          transaction.symbol = Constants.symbolsArray[item.idTransactionType - 1];
          transaction.status = new TransactionStatus(item.status);

          switch (item.idOriginRecharge) { //1,3,6,7,8,9,10, 11
            case (1): //Envio de pago

              if (user.email == item.emailSender) {
                if(item.reason=='Remate'){
                  transaction.iconImg = "/assets/images/new-icons/remate.svg";
                  transaction.description = "Pagaste remate a " + item.receiver.fullName;
                }else{
                  transaction.iconImg = "/assets/images/new-icons/solicitud-dinero.svg";
                  transaction.description = "Pagaste/Enviaste dinero a " + item.receiver.fullName;
                }

              } else if (user.email == item.receiver.email) {
                //transaction.iconImg = environment.api.avatarUrl + item.avatarURL;
                if(item.reason=='Remate'){
                  transaction.description = item.fullNameSender + " te pagó remate";
                }else{
                  transaction.description = item.fullNameSender + " te envió dinero";
                }

              }
              break;
            case (2): //Solicitud de pago
              if (user.email == item.emailSender) {//usuario logueado envia solicitud
                transaction.iconImg = "/assets/images/new-icons/solicitud-dinero.svg";
                transaction.description = item.receiver.fullName + " te solicitó dinero";
              } else if (user.email == item.receiver.email) {
                //transaction.iconImg = environment.api.avatarUrl + item.avatarURL;
                transaction.description = "Cobraste a " + item.fullNameSender;

              }
              break;
            case (3): //Ingreso con Tarjeta
              transaction.iconImg = "/assets/images/new-icons/ingresar-dinero.svg";
              transaction.description = "Ingresaste dinero";
              break;
            case (6):// Cobros
              if (user.email == item.emailSender) {
                transaction.iconImg = "/assets/images/new-icons/solicitud-dinero.svg";
                transaction.description = item.receiver.fullName + " te solicitó dinero";
              } else if (user.email == item.receiver.email) { // Usuario logueado envia solicitud de pago
                //transaction.iconImg = environment.api.avatarUrl + item.avatarURL;
                if (transaction.status.value == '2') {
                  transaction.description = "Cobraste/Recibiste dinero de " + item.fullNameSender;
                } else {
                  transaction.description = "Cobraste a " + item.fullNameSender;
                }

              }
              break;
            case (7):// Ingreso con Efectivo
              transaction.iconImg = "/assets/images/new-icons/ingresar-dinero.svg";
              transaction.description = "Ingresaste dinero";
              break;
            case (8):// Ingreso con Deposito
              transaction.iconImg = "/assets/images/new-icons/ingresar-dinero.svg";
              transaction.description = "Ingresaste dinero";
              break;
            case (9):// Ingreso con Transferencia
              transaction.iconImg = "/assets/images/new-icons/ingresar-dinero.svg";
              transaction.description = "Ingresaste dinero";
              break;
            case (10): //Remates

              if (user.email == item.emailSender) {
                transaction.iconImg = "/assets/images/new-icons/remate.svg";
                transaction.description = "Remataste tus P$C";
              } else if (user.email == item.receiver.email) {
                transaction.iconImg = "/assets/images/new-icons/remate.svg";
                transaction.description = "Aceptaste remate de "+item.fullNameSender;
              }
              break;
              case (11): //Recarga de tarjeta
                transaction.iconImg = "/assets/images/new-icons/tarjeta.svg";
                transaction.description = item.message.replace('Recarga de Tarjeta','Recargaste tu tarjeta ');
              break;             
          }

          return transaction;

        });
        return paginator;
      }

    ).catch(
      () => {
        return paginator;
      }
    )



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

  sendPayment(paymentType: number, transaction: Transaction) {
    let url: string;
    let payment;
    if (paymentType != 3) {
      url = '/transactions';
      payment = {
        ammount: transaction.amount,
        sender: transaction.sender.email,
        receiver: transaction.receiver.email,
        message: transaction.reason,
        idtransactiontype: transaction.type.value
      }
    } else {
      url = '/transactions/CreateMultiPay';
      const payment1 = {
        Idtransactiontype: transaction.multiPey[0].type.value,
        Ammount: transaction.multiPey[0].amount
      }
      const payment2 = {
        Idtransactiontype: transaction.multiPey[1].type.value,
        Ammount: transaction.multiPey[1].amount
      }
      payment = {
        Receiver: transaction.receiver.email,
        Message: transaction.reason,
        PayDTOs: [payment1, payment2]
      }
    }
    console.log('payment en el servicio', payment)
    return this.post(url, payment).toPromise();
  }

  /**
 * Start a Send money transaction
 * @return Promise
 */
  createExternal(transaction: Transaction) {
    return this.post('/transactions/CreateExternalTransaction', {
      Ammount: transaction.amount,
      IdTransactionType: parseInt(transaction.type.value),
      IdOriginRecharge: parseInt(transaction.originRecharge.value),
      PayerData: "No.REF: 0125452848145 Rapid Pago"

    }).toPromise();
  }

}
