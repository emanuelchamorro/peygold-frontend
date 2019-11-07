import {Component, OnInit} from '@angular/core';
import {Transaction} from '../../../../models';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';

@Component({
  selector: 'app-eu-pey-money-add-by-bank-transfer',
  templateUrl: './eu-pey-money-add-by-bank-transfer.component.html',
  styleUrls: ['./eu-pey-money-add-by-bank-transfer.component.scss']
})
export class EuPeyMoneyAddByBankTransferComponent extends EuPeyMoneyAddComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
