import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {DocumentType} from '../models/document-type';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService extends BaseService {
  /**
   * Get the list of document models
   */
  get documentsType(): Array<DocumentType> {
    return [
      new DocumentType('1', 'DNI'),
      new DocumentType('2', 'Libreta de identidad')
    ];
  }
}
