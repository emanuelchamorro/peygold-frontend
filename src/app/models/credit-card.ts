/**
 * Transaction model
 */
import {Model} from './model';

export class CreditCard extends Model {

  public number: number;
  public securityCode: number;
  public expirationMonth: number;
  public expirationYear: number;
  public holderName: string;
  public type: string;
  public identificationType: string;
  public identificationNumber: string;
  public extraInfo: any;
}
