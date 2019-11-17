import {Address} from './address';
import {Model} from './model';
import {DocumentType} from './document-type';
import {Occupation} from './occupation';
import {Nationality} from './nationality';
import {ProfitInstitution} from './profit-institution';
import {Contact} from './contact';
import {Role} from './role';

/**
 * User model
 */
export class User extends Model {
  static TYPE_PERSON      = 'person';
  static TYPE_COMPANY     = 'company';
  static TYPE_INSTITUTION = 'institution';
  static ADMIN_IDENTIFIER = 1;

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
  public roles: Array<Role>;
  public primaryActivityName: string;
  public documents: Array<any>;
  public locals: Array<any>;
  public contact: Contact;
  public profitInstitution: ProfitInstitution;
  public occupation: Occupation;
  public nationality: Nationality;
  public address: Address = new Address();
  public billingAddress: Address;
  public idPrimaryActivity: number;
  public systemUserTypeId: number;
  public canChargePeygold: boolean;
  public rememberMe: boolean;

  /**
   * Get the user complete Name
   * @return string the complete name
   */
  get completeName(): string {
    return this.fullName || this.name + ' ' + this.lastName;
  }

  /**
   * Get the user initials name
   * @return string the initials name
   */
  get initials(): string {
    const completeName = this.completeName;

    if (!completeName) {
      return '';
    }

    let initials = '';

    completeName.split(' ').map((name) => initials += name.charAt(0));

    return initials;
  }

  /**
   * Add new role.
   * @param name role name.
   */
  addRole(name: string) {
    if (! this.roles) {
      this.roles = new Array<Role>();
    }
    this.roles.push(new Role(name, name));
  }

  /**
   * Get
   */
  get isAdmin(): boolean {
    if (! this.systemUserTypeId) {
      return false;
    }

    return this.systemUserTypeId === User.ADMIN_IDENTIFIER;
  }
}

