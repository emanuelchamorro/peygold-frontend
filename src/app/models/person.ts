import {Occupation} from './occupation';
import {Nationality} from './nationality';
import {DocumentType} from './document-type';
import {ProfitInstitution} from './profit-institution';
import {User} from './user';

/**
 * Person model
 */
export class Person extends User {

  public name: string;
  public lastName: string;
  public occupation: Occupation;
  public documentType: DocumentType;
  public documentNumber: string;
  public nationality: Nationality;
  public profitInstitution: ProfitInstitution;
}
