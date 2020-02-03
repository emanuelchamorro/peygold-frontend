import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {DocumentType} from '../models/document-type';
import {TransactionType, SelectOption} from '../models';
import {TransactionTypeEnum} from '../enums';
import {LoanOption} from '../models/loan-option';


@Injectable({
  providedIn: 'root'
})
export class InMemoryService extends BaseService {

   /**
   * Get the list of document models
   */
  get documentTypes(): Array<DocumentType> {
    return [
      new DocumentType('1', 'DNI'),
      new DocumentType('2', 'Libreta de identidad')
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

}
