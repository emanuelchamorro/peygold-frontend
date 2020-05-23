import { Model } from './model'; 
import { GeneralChargeCredit } from './general-charge-credit';


/**
 * Bank model
 */
export class Retention extends Model {

  public monthArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  public monthNumber: number;
  
  public tax: GeneralChargeCredit;
  public amount: string; // total

  public idPeyGoldBalance: number;
  public idTransactionHistory: number;
  public comision: string;

  public iva: string;
  public retencionIVA: string;
  public iibb: string;
  public retencionIIBB: string;



  public get month():string {
    return this.monthArray[this.monthNumber - 1];
  }

}
