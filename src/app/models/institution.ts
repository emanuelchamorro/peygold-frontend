import {User} from './user';

/**
 * Institution model
 */
export class Institution extends User {
  public bussinessName: string;
  public cuit: string;
  public website: string;
}
