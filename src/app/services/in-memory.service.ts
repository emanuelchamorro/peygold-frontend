import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {DocumentType} from '../models/document-type';
import {TransactionType, SelectOption, LoanStatus, TransactionStatus} from '../models';
import {TransactionTypeEnum} from '../enums';
import {LoanOption} from '../models/loan-option';
import { SelectOptionQuestion } from '../models/select-option-question';
import { EffectType } from '../models/effect-type';
import { EffectApplicationType } from '../models/effect-application-type';
import { OriginTransactionType } from '../models/origin-transaction-type';


@Injectable({
  providedIn: 'root'
})
export class InMemoryService extends BaseService {

   /**
   * Get the list of document models
   */
  get documentTypes(): Array<DocumentType> {
    return [
      new DocumentType('DNI', 'DNI'),
      new DocumentType('CI', 'Cédula'),
      new DocumentType('LC', 'L.C.'),
      new DocumentType('LE', 'L.E.'),
      new DocumentType('Otro', 'Otro')
    ];
  }

  /**
   * Get the list of document models
   */
  documentTypeByValue(value: string): DocumentType {
    const documents = this.documentTypes.filter(
      (documentType: DocumentType) => documentType.value === String(value));

    if (! documents) {
      return new DocumentType();
    }

    return documents[0];
  }

  /**
   * Get the list of transaction type
   */
  transactionTypes(multipey = false, creditPoints = false): Array<TransactionType> {
    const types = new Array<TransactionType>(
      new TransactionType(TransactionTypeEnum.Fiat, 'Pesos($)'),
      new TransactionType(TransactionTypeEnum.Points, 'Peygold(P$G)'),
    );

    if (creditPoints) {
      types.push(new TransactionType(TransactionTypeEnum.CreditPoints, 'Peygold créditos(P$C)'));
    } 

    if (multipey) {
      types.push(new TransactionType(TransactionTypeEnum.MultyPey, 'MultyPey'));
    }

    return types;
  }

  /**
   * Returns the loan options to make a loan request.
   */
  loanOptions(amount:number): Array<LoanOption> {
    return [
      new LoanOption('Opción 1', 1, amount/1),
      new LoanOption('Opción 2', 3, amount/3),
      new LoanOption('Opción 3', 4, amount/4),
    ];
  }

  get rescueOptions(): Array<SelectOption>{

    return[
      new SelectOption('1','Rescatar a 60 dias del vencimiento'),
      new SelectOption('3','Alianza comercial'),
      new SelectOption('2','Canjear a 60 días del vencimiento por P$G'),
      new SelectOption('4','Cancelación anticipada')
    ]
  }

  loadOptionsQuestions(type:number): Array<SelectOptionQuestion> {
    if(type==1){
      return [
        new SelectOptionQuestion('1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 1', '¿Cómo pago las cuotas?'),
        new SelectOptionQuestion('2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 2', '¿Cuál es la taza del préstamo?'),
        new SelectOptionQuestion('3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 3','¿Qué pasa si me atraso en el pago?'),
        new SelectOptionQuestion('4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 4','¿Puedo cancelarlo anticipadamente?'),

      ];
    }else if(type==2){
      return [
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 5', '¿Cómo pago las cuotas?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 6', '¿Cuál es la taza del préstamo?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 7','¿Qué pasa si me atraso en el pago?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 8','¿Puedo cancelarlo anticipadamente?'),
      ];
    }else{
      return [
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 9', '¿Cómo pago las cuotas?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 10', '¿Cuál es la taza del préstamo?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 11','¿Qué pasa si me atraso en el pago?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 12','¿Puedo cancelarlo anticipadamente?'),
      ];
    }

  }

 get loadEffectTypes():Array<EffectType>{
    return [
      new EffectType('-1','Cargo'),
      new EffectType('1','Abono')
    ]
  }

 get loadEffectAplicationTypes():Array<EffectApplicationType>{
    return [
      new EffectApplicationType('1','Monto base'),
      new EffectApplicationType('2','Comisión')
    ]
  }

  get loadStatus():Array<LoanStatus>{

    return [
      new LoanStatus('2'),
      new LoanStatus('3')
    ]
  }

  get loadYears():Array<SelectOption>{
    const currenteDate = new Date();
    const years = new Array<SelectOption>();
    for (let i = currenteDate.getFullYear(); i > 2017; i--) {
      years.push(new SelectOption(String(i),String(i)));
    }
    return years;
  }

  get loadOriginRecharge():Array<OriginTransactionType>{
    const originTransactionTypes = new Array<OriginTransactionType>();

    originTransactionTypes.push(new OriginTransactionType('6','Cobros'));
    originTransactionTypes.push(new OriginTransactionType('1','Envios de dinero'));
    originTransactionTypes.push(new OriginTransactionType('2','Solicitudes recibidas'));
    originTransactionTypes.push(new OriginTransactionType('5','Ingreso de dinero')); //8,7,3,9
    originTransactionTypes.push(new OriginTransactionType('10','Remates'));
    originTransactionTypes.push(new OriginTransactionType('4','Créditos'));


    return originTransactionTypes

  }


  get loadTransactionStatus():Array<TransactionStatus>{
    const transactionStatus = new Array<TransactionStatus>();

    transactionStatus.push(new TransactionStatus('2','Aprobados'));
    transactionStatus.push(new TransactionStatus('1','Pendientes'));
    transactionStatus.push(new TransactionStatus('3','Rechazados'));
    transactionStatus.push(new TransactionStatus('4','Cancelados'));
    transactionStatus.push(new TransactionStatus('5','Devueltos'));


    return transactionStatus

  }

}
