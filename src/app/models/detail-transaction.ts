import {Model} from './model';
import {GeneralChargeCredit} from './general-charge-credit';


/**
 * Transaction model
 */

export class DetailTransaction extends Model {


  //pey balance
  idPeyGoldBalance: number;
  generalChargeCredit: GeneralChargeCredit;
  provinceChargeCredit: GeneralChargeCredit;
  amount: number;

}
