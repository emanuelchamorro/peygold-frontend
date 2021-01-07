import {Model} from './model';
import {User} from './user';
import {AuctionStatus} from './auction-status';
import {Transaction} from './transaction';



/**
 * Transaction model
 */

export class Auction extends Model {

  public id;
  public messages: string;
  public reason: string;
  public transaction: Transaction;

  public status: AuctionStatus;
  public discount: any;
  public duration:any;
  public year:number;
  public month: number;
  

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

    /**
   * Return expirations day of peygolds creditos
   */
  get expirationDate():any{
    let date = new Date(this.year+'/'+this.month+'/'+'30');
    return date;
  }

  /**
   * Return expirations day of remate
   */
  get auctionExpirationDate():any{

    const startDate = new Date(this.transaction.createdAt);
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + this.duration);
    return endDate;
  }

  /**
   * Countdown
   */
  get endsIn():any{

      const startDate = new Date();
      const endDate = this.auctionExpirationDate;
      const end = endDate.getDate() - startDate.getDate();
      return endDate.getDate() - startDate.getDate();


  }
 
}
