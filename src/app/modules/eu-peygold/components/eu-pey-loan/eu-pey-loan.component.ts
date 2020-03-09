import {Component, Input, OnInit} from '@angular/core';
import {Loan} from '../../../../models';

@Component({
  selector: 'app-eu-pey-loan',
  templateUrl: './eu-pey-loan.component.html',
  styleUrls: ['./eu-pey-loan.component.scss']
})
export class EuPeyLoanComponent implements OnInit {

  @Input()
  private loan: Loan;

  @Input()
  private loanDetail: Loan;

  /**
   * On Init implementation
   */
  ngOnInit() {
  }

}
