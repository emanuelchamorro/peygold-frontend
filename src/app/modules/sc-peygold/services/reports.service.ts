import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';
import {  Transaction, TransactionType, User } from '../../../models';
import { OriginTransactionType } from '../../../models/origin-transaction-type';
import { DetailTransaction } from '../../../models/detail-transaction';
import {GeneralChargeCredit} from '../../../models/general-charge-credit';
import { EffectType } from '../../../models/effect-type';
import { Retention } from '../../../models/retention';

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
        });

        return paginator;
      }
    ).catch(
      (error)=>{
        return paginator;
      }
    );
  }

  searchRetentions(year:number):Promise<Array<Retention>>{
    let retentions:Array<Retention>;
    return this.get(`/peygoldbalances/reporteretenciones/${year}`).toPromise().then(
      (resp)=>{
        retentions = resp.map((item:any)=>{
          let retention = new Retention();
          retention.monthNumber = item.mes;
          retention.amount = Intl.NumberFormat("es-AR").format(item.totalMes.replace(',','')) ;
          return retention;

        });
        return retentions;
      }

    ).catch(
      (error)=>{
        return null;
      }
    )
  }

  loadDetail(month:number,year:number):Promise<Array<Retention>>{
    let retentions:Array<Retention>;
    return this.get(`/peygoldbalances/reporteretencionesdetails/${month}/${year}`).toPromise().then(

      (resp)=>{
        retentions = resp.map((item:any)=>{
          let retention = new Retention();
          retention.idPeyGoldBalance = item.idPeyGoldBalance;
          retention.idTransactionHistory = item.idTransactionHistory;
          retention.comision = Intl.NumberFormat("es-AR").format(item.comision) ;
          retention.iva = Intl.NumberFormat("es-AR").format(item.iva);
          retention.retencionIVA = Intl.NumberFormat("es-AR").format(item.retencionIVA) ;
          retention.iibb = Intl.NumberFormat("es-AR").format(item.iibb);
          retention.retencionIIBB = Intl.NumberFormat("es-AR").format(item.retencionIIBB) ;
          retention.amount = Intl.NumberFormat("es-AR").format(item.comision + item.iva + item.retencionIVA + item.iibb + item.retencionIIBB) ; 
          return retention;

        });
        return retentions;
      }

    ).catch(
      (error)=>{
        return null;
      }
    ) 

  }

}
