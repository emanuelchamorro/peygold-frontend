import {Model} from './model';
import {DocumentType} from './document-type';

/**
 * Contact model
 */
export class Contact extends Model {
  public name: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public documentType: DocumentType;
  public documentNumber: string;
}
