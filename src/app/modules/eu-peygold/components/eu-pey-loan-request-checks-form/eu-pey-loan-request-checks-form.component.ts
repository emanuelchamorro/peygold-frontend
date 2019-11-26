import { Component, OnInit } from '@angular/core';
import {InMemoryService} from '../../../../services';
import {LoanOption, Check} from '../../../../models';

@Component({
  selector: 'app-eu-pey-loan-request-checks-form',
  templateUrl: './eu-pey-loan-request-checks-form.component.html',
  styleUrls: ['./eu-pey-loan-request-checks-form.component.scss']
})
export class EuPeyLoanRequestChecksFormComponent implements OnInit {

  private loanOptions: Array<LoanOption>;
  private loanOption: LoanOption;
  private check: Check;

  constructor(
    private inMemoryService: InMemoryService
  ) { }

  /**
   * On Init implementation
   */
  ngOnInit() {
    this.loanOptions = this.inMemoryService.loanOptions;
  }

  /**
   * Select the loan option
   * @param option The selected loan option
   */
  selectOption(option: LoanOption): void {
    this.loanOption = option;
    this.check = option.checks[0];
  }

  /**
   * Set the current check to be updated.
   * @param check The check object
   */
  setCheck(check: Check): void {
    this.check = check;
  }
}
