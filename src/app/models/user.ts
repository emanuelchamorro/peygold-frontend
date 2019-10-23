import {Address} from './address';

/**
 * User model
 */
export class User {

  public id: number;
  public phone: string;
  public email: string;
  public password: string;
  public address: Address;
}

