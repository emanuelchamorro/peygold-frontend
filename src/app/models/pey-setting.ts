import {Country} from './country';
import {State} from './state';
import {City} from './city';
import {Model} from './model';

/**
 * Address model
 */
export class PeySetting extends Model {

  public idConfiguration:number;
  public institutionCommission: string; //Comisión institución
  public peygoldCommission: string; //Comisión Peygold
  public iva: string; // iva
  public peygoldPointOfSaleCommission: string; // Comisión punto de venta Peygold
  public minimumAmountOfPeygoldPointOfSale: string; // Monto mínimo punto de venta Peygold
  public minimumAmountOfPeygoldCredit: string; // Monto mínimo crédito Peygold
  public maximumAmountOfPeygoldCredit: string; // Monto máximo crédito Peygold
  public maximumSettlementAmount: string; // Monto máximo de liquidación

  constructor() {
    super();
  }
}
