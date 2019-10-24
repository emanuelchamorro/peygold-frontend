import {Address} from './address';
import {Model} from './model';

/**
 * User model
 */
export class User extends Model {

  static TYPE_PERSON      = 'person';
  static TYPE_COMPANY     = 'company';
  static TYPE_INSTITUTION = 'institution';

  public id: number;
  public phone: string;
  public email: string;
  public password: string;
  public address: Address = new Address();
  public idUserType: number;
  public idAspNetUser: string;
  public tac: boolean;
  public description: string;
  public newsLetter: boolean;
  public peygoldCommission: number;
}

