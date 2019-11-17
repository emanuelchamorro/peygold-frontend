import {Model} from './model';
import {User} from './user';
import {TransactionStatus} from './transaction-status';
import {TransactionType} from './transaction-type';

/**
 * Transaction model
 */

export class Transaction extends Model {

  public id;
  public createdAt;
  public amount;
  public receiver: User;
  public sender: User;
  public messages: string;
  public reason: string;
  public type: TransactionType;
  public commissionPercentaje: number;
  public commissionAmmount: number;
  public idOriginRecharge: number;
  public originRechargeName: number;
  public status: TransactionStatus;
  public processedAt: string;
  public processedComments: string;

  /**
   * Get the action label to show to the user about the transaction.
   */
  get actionLabel(): string {
    return 'Cobraste a ' + this.receiver.completeName;
  }

  /**
   * returns if the transaction  data is valid to send a request money transaction
   */
  get isValidToRequestMoney(): boolean {
    return this.isValidToStart;
  }

  get isValidToSendMoney(): boolean {
    return this.isValidToStart;
  }

  get isValidToStart(): boolean {
    return this.type
      && this.amount
      && this.reason
      && this.receiver !== null
      && this.sender !== null;
  }
}
