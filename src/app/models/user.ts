import {Address} from './address';
import {Model} from './model';
import {DocumentType} from './document-type';
import {Occupation} from './occupation';
import {Nationality} from './nationality';
import {ProfitInstitution} from './profit-institution';
import {Contact} from './contact';

/**
 * User model
 */
export class User extends Model {
  static TYPE_PERSON      = 'person';
  static TYPE_COMPANY     = 'company';
  static TYPE_INSTITUTION = 'institution';

  public id: number;
  public avatarURL: string;
  public dateRegistered: string;
  public name: string;
  public lastName: string;
  public fullName: string;
  public documentType: DocumentType;
  public documentNumber: string;
  public phone: string;
  public email: string;
  public password: string;
  public idUserType: number;
  public idAspNetUser: string;
  public tac: boolean;
  public description: string;
  public newsLetter: boolean;
  public peygoldCommission: number;
  public token: string;
  public avatar: string;
  public bussinessName: string;
  public cuit: string;
  public website: string;
  public volunteerQuantity: number;
  public commission: number;
  public employeeQuantity: number;
  public bankAccounts: Array<any>;
  public annualIncome: number;
  public instagram: string;
  public youtube: string;
  public linkedIn: string;
  public twitter: string;
  public facebook: string;
  public roles: Array<string>;
  public primaryActivityName: string;
  public documents: Array<any>;
  public locals: Array<any>;
  public contact: Contact;
  public profitInstitution: ProfitInstitution;
  public occupation: Occupation;
  public nationality: Nationality;
  public address: Address = new Address();
  public billingAddress: Address;

  /**
   * Get the user fullName
   */
  get completeName(): string {
    return this.fullName || this.name + ' ' + this.lastName;
  }
}

