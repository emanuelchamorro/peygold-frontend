import {Model} from './model';
import {User} from './user';
import {LoanStatus} from './loan-status';


/**
 * Loan model
 */
export class InsuranceLoan extends Model {

  public id: string;
  public creationDate:string;
  public insuranceStatus: LoanStatus;
  public revisionDate:string;
  public policyNumber:string;
  public policyPath:string;
  public comments:string;
  public userAdmin:User;

}
