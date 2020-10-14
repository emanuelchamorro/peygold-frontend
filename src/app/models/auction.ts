import {Model} from './model';
import {User} from './user';
import {TransactionStatus} from './transaction-status';
import {Transaction} from './transaction';



/**
 * Transaction model
 */

export class Auction extends Model {

  public id;
  public messages: string;
  public reason: string;
  public transaction: Transaction;

  public status: TransactionStatus;
  public discount: number;
  public duration:number;
  public expirationDate;

  /**
   * Return term of day valid for auction
   */
  get timeLimit():number{
    const endDate = new Date();
    const d = new Date(endDate.getFullYear(), endDate.getMonth()+1, 0);
    const endDay = d.getDate()
    endDate.setDate(endDay);

    const initDate = this.transaction.createdAt;
    const initDay = initDate.getDate();
    return endDay - initDay;

  }

  get year():number{
    return new Date(this.expirationDate).getFullYear();

  }

  get month():number{
    return new Date(this.expirationDate).getMonth() + 1;
    
  }
 
}
