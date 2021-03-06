import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {DocumentType} from '../models/document-type';
import {TransactionType, SelectOption, LoanStatus} from '../models';
import {TransactionTypeEnum} from '../enums';
import {LoanOption} from '../models/loan-option';
import { SelectOptionQuestion } from '../models/select-option-question';
import { EffectType } from '../models/effect-type';
import { EffectApplicationType } from '../models/effect-application-type';


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
  transactionTypes(multipey = false): Array<TransactionType> {
    const types = new Array<TransactionType>(
      new TransactionType(TransactionTypeEnum.Fiat, 'Pesos'),
      new TransactionType(TransactionTypeEnum.Points, 'Peygold debito'),
    );

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
      new SelectOption('2','Alianza comercial'),
      new SelectOption('3','Canjear a 60 días del vencimiento por P$G'),
      new SelectOption('4','Cancelación anticipada')
    ]
  }

  loadOptionsQuestions(type:number): Array<SelectOptionQuestion> {
    if(type==1){
      return [
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 1', '¿Cómo pago las cuotas?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 2', '¿Cuál es la taza del préstamo?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 3','¿Qué pasa si me atraso en el pago?'),
        new SelectOptionQuestion('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum 4','¿Puedo cancelarlo anticipadamente?'),

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
      new EffectType('1','Cargo'),
      new EffectType('2','Abono')
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

}
