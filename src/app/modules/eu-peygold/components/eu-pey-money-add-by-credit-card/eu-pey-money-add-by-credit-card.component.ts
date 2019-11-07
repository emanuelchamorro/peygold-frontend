import { Component, OnInit } from '@angular/core';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';

@Component({
  selector: 'app-eu-pey-money-add-by-credit-card',
  templateUrl: './eu-pey-money-add-by-credit-card.component.html',
  styleUrls: ['./eu-pey-money-add-by-credit-card.component.scss']
})
export class EuPeyMoneyAddByCreditCardComponent extends EuPeyMoneyAddComponent implements OnInit {

  private step = 1;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  /**
   * Continue with the next step
   */
  continue() {
    this.step++;
  }

  /**
   * Go back with the previous step
   */
  back() {
    this.step--;
  }

  /**
   * Send the transaction.
   * @return void
   */
  sendTransaction(){
    console.log(this.transaction);
  }
}
