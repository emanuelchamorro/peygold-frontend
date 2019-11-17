import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {DocumentType} from '../models/document-type';
import {TransactionType} from '../models';
import {TransactionTypeEnum} from '../enums';

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
  transactionTypes(): Array<TransactionType> {
    return new Array<TransactionType>(
      new TransactionType(TransactionTypeEnum.Fiat, 'Pesos'),
      new TransactionType(TransactionTypeEnum.Points, 'Peygold debito'),
    );
  }
}
