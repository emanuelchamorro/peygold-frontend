import { Component, OnInit, Input } from '@angular/core';
import {Loan} from '../../../../models';

@Component({
  selector: 'app-sc-pey-loan',
  templateUrl: './sc-pey-loan.component.html',
  styleUrls: ['./sc-pey-loan.component.scss']
})
export class ScPeyLoanComponent implements OnInit {

  @Input()
  private loan: Loan;

  @Input()
  private loanDetail: Loan;

  constructor() { }

  ngOnInit() {
  }

}
