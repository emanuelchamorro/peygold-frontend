import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';
import { Address, CheckRescue, Loan, LoanStatus, PaymentMethod, State, Transaction, TransactionType, User, LoanRequest, SelectOption, Check, Bank, Country, City, CreditDestination } from '../../../models';
import { OriginTransactionType } from '../../../models/origin-transaction-type';
import { DetailTransaction } from '../../../models/detail-transaction';
import {GeneralChargeCredit} from '../../../models/general-charge-credit';
import { EffectType } from '../../../models/effect-type';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends HttpService {

  //type?: TransactionType, word?: string, startDate?:string, endDate?:string 

  searchAccountState(page: number, perPage: number, word?: string, type?: TransactionType, startDate?:string, endDate?:string): Promise<PaginationResponse>{
    const paginator = new PaginationResponse(page, perPage);
    let params: any = {}

    params.Page = page;
    params.Size = perPage;

    if(word){
      params.Words = word;
    }

    if(type){ 
      params.IdTransactionType = parseInt(type.value);
    }

    if(startDate) {
      params.Desde = startDate;
    }

    if(endDate) {
      params.Hasta = endDate;
    }

    return this.post('/transactions/reportestadocuenta',params).toPromise().then(
      (resp)=>{
        paginator.count = resp.recordCount;
        paginator.data = resp.getTransactionDTOs.map((item)=>{
          const transaction = new Transaction();

          transaction.id = item.idTransactionHistory;
          transaction.createdAt = item.dateAndTime;
          transaction.amount = parseFloat(item.ammount);

          transaction.sender = new User();
          transaction.sender.email = item.emailSender;
          transaction.sender.name = item.fullNameSender
          transaction.sender.fullName = item.fullNameSender;
          transaction.receiver = new User();
          transaction.receiver.name = item.receiver.fullName;
          transaction.receiver.fullName = item.receiver.fullName;
          transaction.receiver.email = item.receiver.email;

          transaction.messages = item.message;
          transaction.type = new TransactionType(item.idTransactionType);
          transaction.commissionPercentaje = parseFloat(item.commissionPercentaje);
          transaction.commissionAmmount = parseFloat(item.commissionAmmount);
          transaction.originRecharge = new OriginTransactionType(item.idOriginRecharge,item.originRechargeName);

          transaction.totalAmount = 0;

          transaction.detailsTransaction = item.peyGoldBalances.map((trans)=>{
            const detail = new DetailTransaction();
            if(trans.idConceptoCargoAbono){
              detail.generalChargeCredit = new GeneralChargeCredit();
              detail.generalChargeCredit.idChargeCredit = trans.idConceptoCargoAbono;
              detail.generalChargeCredit.label =  trans.tipoMovimiento;
              if(trans.signo == 1){
                detail.generalChargeCredit.effect = new EffectType('1','Abono');
                transaction.totalAmount = transaction.totalAmount + trans.monto;
              }else{
                detail.generalChargeCredit.effect = new EffectType('-1','Cargo');
                transaction.totalAmount = transaction.totalAmount - trans.monto;
              }
              detail.generalChargeCredit.amount = trans.porcentaje;
              detail.amount = trans.monto;
            }

            if(trans.idConceptoCargoAbonoProvincia){
              detail.provinceChargeCredit = new GeneralChargeCredit();
              detail.provinceChargeCredit.idChargeCredit = trans.idConceptoCargoAbonoProvincia;
              detail.provinceChargeCredit.label =  trans.tipoMovimiento;
              if(trans.signo == 1){
                detail.provinceChargeCredit.effect = new EffectType('1','Abono');
                transaction.totalAmount = transaction.totalAmount + trans.monto;
              }else{
                detail.provinceChargeCredit.effect = new EffectType('-1','Cargo');
                transaction.totalAmount = transaction.totalAmount - trans.monto;
              }
              detail.provinceChargeCredit.amount = trans.porcentaje;
              detail.amount = trans.monto;
            }

            return detail;
          })

          return transaction;

          /**
                    "idPeyGoldBalance": 2671,
                    "idTransactionHistory": 2987,
                    "transactionDate": "2020-04-01T14:16:18.4047267",
                    "idConceptoCargoAbono": 2,
                    "idConceptoCargoAbonoProvincia": null,
                    "tipoMovimiento": "Comisión PeyGold",
                    "signo": 1,
                    "porcentaje": 0.0800,
                    "monto": 88.0000,
                    "transactionHistory": null,
                    "conceptoCargoAbonoGeneral": null,
                    "conceptoCargoAbonoProvincia": null
           */


        });

        return paginator;
      }
    ).catch(
      (error)=>{
        return paginator;
      }
    );



  }

}
