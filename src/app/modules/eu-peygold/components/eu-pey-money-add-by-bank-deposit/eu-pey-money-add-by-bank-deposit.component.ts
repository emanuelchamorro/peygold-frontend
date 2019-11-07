import { Component, OnInit } from '@angular/core';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';

@Component({
  selector: 'app-eu-pey-money-add-by-bank-deposit',
  templateUrl: './eu-pey-money-add-by-bank-deposit.component.html',
  styleUrls: ['./eu-pey-money-add-by-bank-deposit.component.scss']
})
export class EuPeyMoneyAddByBankDepositComponent extends EuPeyMoneyAddComponent  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
