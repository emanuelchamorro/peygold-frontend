import {Model} from './model';
import {User} from './user';
import {TransactionType} from './transaction-type';
import {LoanStatus} from './loan-status';
import {CheckRescue} from './check-rescue';
import {PaymentMethod} from './payment-method';
import {CreditDestination} from './credit-destination';

/**
 * Loan model
 */
export class Loan extends Model {
  public id: number;
  public creditDetailId: number;
  public amount: number;
  public employees: number;
  public loanConcept: string;
  public verifiedInformation: string;
  public verifiedComments: string;
  public approveDeniedComments: string;
  public applicationDate: string;
  public responseDate: string;
  public verifiedDate: string;
  public peygoldExpirationDate: string;
  public transactionType: TransactionType;
  public status: LoanStatus;
  public insuranceStatus: LoanStatus;
  public checkRescue: CheckRescue;
  public paymentMethod: PaymentMethod;
  public creditDestination: CreditDestination;
  public applicant: User;
}
