import {Model} from './model';
import {User} from './user';

/**
 * Loan model
 */
export class CheckLog extends Model {
  public id: number;
  public idCheck: number;
  public comments:string;
  public userUpdate:User; //usuario quien actualiza
  public modificationDate:string;
  public oldData:string;
  public newData:string;

}

