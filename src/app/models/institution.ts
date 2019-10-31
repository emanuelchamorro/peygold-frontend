import {User} from './user';
import {Company} from './company';
import {ProfitInstitution} from './profit-institution';

/**
 * Institution model
 */
export class Institution extends Company {

  /**
   * Change this object to a Profit Institution model.
   * @return ProfitInstitution the profit institution
   */
  toProfitInstitution(): ProfitInstitution {
    const id = this.id ? this.id.toString() : '';
    return new ProfitInstitution(id, this.bussinessName);
  }
}
