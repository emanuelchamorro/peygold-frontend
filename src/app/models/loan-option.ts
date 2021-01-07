import {Model} from './model';
import {Check} from './check';
import {Bank} from './bank';
import {Address} from './address';
import { User } from './user';

/**
 * Loan model
 */
export class LoanOption extends Model {

  public expirationDate: string;
  public checks: Array<Check>;

  constructor(
    public name: string,
    public dues: number,
    public duesAmount: number) {
    super();
    this.checks = new Array<Check>();
    let date =  new Date();
    for (let i = 0; i < this.dues; i++ ) {
      const check = new Check();
      let dueDate = new Date()
      let month = dueDate.getMonth();

      dueDate.setMonth(month + (i+1));

      check.gender = 1;
      check.issuanceDateStr = date.getDate()+'/'+(date.getMonth()+1) +'/'+date.getFullYear();
      check.expirationDateStr = dueDate.getDate()+'/'+(dueDate.getMonth()+1) +'/'+dueDate.getFullYear();
      check.issuanceDate = {
        "year": date.getFullYear(),
        "month": date.getMonth()+1,
        "day": date.getDate()
      };
      check.expirationDate = {
        "year": dueDate.getFullYear(),
        "month": dueDate.getMonth()+1,
        "day": dueDate.getDate(),
      };

      //check.bank = new Bank();
      check.address = new Address();
      check.onwer = new User();
      check.amount = duesAmount;
      this.checks.push(check);
    }

  }
}

