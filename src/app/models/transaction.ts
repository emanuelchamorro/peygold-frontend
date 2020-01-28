import {Model} from './model';
import {User} from './user';
import {TransactionStatus} from './transaction-status';
import {TransactionType} from './transaction-type';
import {stringify} from 'querystring';
import {TransactionTypeEnum} from '../enums';

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
  public multiPey: Array<Transaction>;
  public symbol:string

  /**
   * Get the action label to show to the user about the transaction.
   */
  get actionLabel(): string {
    return 'Cobraste a ' + this.receiver.completeName;
  }

  /**
   * Returns if the transaction  data is valid to request money transaction
   */
  get isValidToRequestMoney(): boolean {
    return this.isValidToStart;
  }

  /**
   * Returns if the transaction  data is valid to send money transaction
   */
  get isValidToSendMoney(): boolean {
    return this.isValidToStart;
  }

  /**
   * Returns true if the transaction is complete and ready to start.
   */
  get isValidToStart(): boolean {
    return this.type
      && this.amount
      && this.reason
      && this.receiver !== null
      && this.sender !== null;
  }

  /**
   * Get the QR info
   */
  get toQR(): string {
    return '{' +
      '"payments": ' + this.paymentsToQR +
      ',' +
      `"fullName": "${this.receiver.completeName}",` +
      `"email": "${this.receiver.email}",` +
      `"avatarURL": "${this.receiver.avatarURL}"` +
    '}';
  }

  get paymentsToQR(): string {
    let payments = '[';

    if (! this.multiPey) {
      payments += `{"idTransactionType":${this.type.value}, "ammount":${this.amount}}`;
    }

    if (this.multiPey) {
      this.multiPey.map( (transaction: Transaction, index:number) => {
        payments += `{"idTransactionType":${transaction.type.value}, "ammount":  ${transaction.amount}}`;
        if(index < 1){
          payments += ',';
        }
      });
    }

    payments += ']';

    return payments;
  }

  public static createFromType(type: TransactionTypeEnum): Transaction {
    const transaction = new Transaction();
    transaction.type = new TransactionType(type);

    return transaction;
  }
}
