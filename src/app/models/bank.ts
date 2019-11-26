import { SelectOption } from './select-option';
import {Address} from './address';

/**
 * Bank model
 */
export class Bank extends SelectOption {
  public address: Address;
  public phone: string;
}
