import {Component, Input, OnInit} from '@angular/core';
import {Loan} from '../../../../models';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-eu-pey-loan',
  templateUrl: './eu-pey-loan.component.html',
  styleUrls: ['./eu-pey-loan.component.scss']
})
export class EuPeyLoanComponent extends BaseComponent implements OnInit {

  @Input()
  private loan: Loan;

  /**
   * On Init implementation
   */
  ngOnInit() {
  }

}
