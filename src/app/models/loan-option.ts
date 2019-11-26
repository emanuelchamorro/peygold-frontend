import {Model} from './model';
import {Check} from './check';

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
      check.expirationDate = new Date().toDateString();
      this.checks.push(check);
    }

  }
}

