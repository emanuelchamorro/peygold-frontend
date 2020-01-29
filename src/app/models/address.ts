import {Country} from './country';
import {State} from './state';
import {City} from './city';
import {Model} from './model';

/**
 * Address model
 */
export class Address extends Model {

  public country: Country;
  public state: State;
  public city: City;

  /**
   * Address model
   * @param street Street name
   * @param houseNumber House number
   * @param floor Building floor
   * @param zipCode ZIP Code
   * @param addressFull Full address
   * @param phone Full address
   */
  constructor(
    public street?: string,
    public houseNumber?: string,
    public buildingFloor?: string,
    public zipCode?: string,
    public addressFull?:string,
    public phone?:string
  ) {
    super();
  }
}
