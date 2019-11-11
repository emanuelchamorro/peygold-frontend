/**
 * Transaction model
 */
import {Model} from './model';
import {isNumber} from 'util';

export class CreditCard extends Model {

  public number: number;
  public securityCode: number;
  public expirationDate: string;
  public holderName: string;
  public type: string;
  public identificationType: string;
  public identificationNumber: string;
  public extraInfo: any;
  public token: string;


  /**
   * Get the expiration month from the expiration date if exist.
   */
  get expirationMonth(): number {
    if (this.expirationDate) {
      return Number(this.expirationDate.substring(0, 2));
    }
  }

  /**
   * Get the expiration year from the expiration date if exist.
   */
  get expirationYear(): number {
    if (this.expirationDate) {
      return Number(this.expirationDate.substring(2));
    }
  }
}
