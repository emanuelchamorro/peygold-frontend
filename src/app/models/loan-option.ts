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

    for (let i = 0; i < this.dues; i++ ) {
      const check = new Check();
      let date =  new Date();
      let month = date.getMonth();
      date.setMonth(month + (i+1));
      console.log('fecha',date.getMonth());
      console.log('year',date.getFullYear());
      console.log('mont',date.getMonth());
      console.log('day',date.getDay());

      check.issuanceDateStr = date.toDateString();
      check.expirationDateStr = date.toDateString();
      check.issuanceDate = {
        "year": date.getFullYear(),
        "month": date.getMonth(),
        "day": date.getDay()
      };
      check.expirationDate = {
        "year": date.getFullYear(),
        "month": date.getMonth(),
        "day": date.getDay(),
      };

      check.bank = new Bank();
      check.address = new Address();
      check.onwer = new User();
      check.amount = duesAmount;
      this.checks.push(check);
    }

  }
}

