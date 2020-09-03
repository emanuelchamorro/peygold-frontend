/**
 * CreditCard model
 */
import {Model} from './model';
import {IdentificationType} from '../modules/mercado-pago/models/identification-type';

export class CreditCard extends Model {
  private static NUMBER_LENGTH = 16;
  private static MIN_NUMBER_LENGTH = 6;

  public number: number;
  public securityCode: number;
  public expirationDate: string;
  public expirationMonth: number;
  public expirationYear: number;
  public holderName: string;
  public type: string;
  public identificationType: IdentificationType;
  public identificationNumber: string;
  public extraInfo: any;
  public token: string;


  /**
   * Get the expiration month from the expiration date if exist.
   */
 /* get expirationMonth(): number {
    if (this.expirationDate) {
      return Number(this.expirationDate.substring(0, 2));
    }
  }*/

  /**
   * Get the expiration year from the expiration date if exist.
   */
 /* get expirationYear(): number {
    if (this.expirationDate) {
      return Number(this.expirationDate.substring(2));
    }
  }*/

  /**
   * Return true if the card is invalid
   */
  get isInvaild(): boolean {
    return this.number
      && this.number.toString().length > CreditCard.MIN_NUMBER_LENGTH
      && this.type === null;
  }
}
