import {Country} from './country';
import {State} from './state';
import {City} from './city';

/**
 * Address model
 */
export class Address {

  public country: Country;
  public state: State;
  public city: City;

  /**
   * Address model
   * @param street Street name
   * @param streetNumber Street number
   * @param floor Building floor
   * @param zipCode ZIP Code
   */
  constructor(
    public street: string,
    public streetNumber: string,
    public buildingFloor: string,
    public zipCode: string
  ) {  }
}
