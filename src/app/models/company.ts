import {User} from './user';
import {ProfitInstitution} from './profit-institution';

/**
 * Company model
 */
export class Company extends User {

  public bussinessName: string;
  public cuit: string;
  public profitInstitution: ProfitInstitution = new ProfitInstitution('1');
}
