import {Model} from './model';
import {User} from './user';

/**
 * Transaction model
 */

export class Transaction extends Model {

  public id;
  public dateTime;
  public amount;
  public receiver: User = new User();
  public sender: User = new User();
  public messages: string;
  public reason: string;
  public type: string;
  public commissionPercentaje: number;
  public commissionAmmount: number;
  public idOriginRecharge: number;
  public originRechargeName: number;

  /**
   * Get the action label to show to the user about the transaction.
   */
  get actionLabel(): string {
    return 'Cobraste a ' + this.receiver.completeName;
  }
}
