import {Occupation} from './occupation';
import {Nationality} from './nationality';
import {Dni} from './dni';
import {ProfitInstitution} from './profit-institution';
import {User} from './user';

/**
 * Person model
 */
export class Person extends User {

  public name: string;
  public lastName: string;
  public occupation: Occupation;
  public dni: Dni;
  public dniNumber: string;
  public nationality: Nationality;
  public profitInstitution: ProfitInstitution = new ProfitInstitution();
}
