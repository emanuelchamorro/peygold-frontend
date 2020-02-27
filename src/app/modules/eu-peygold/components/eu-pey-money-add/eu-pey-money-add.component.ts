import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base.component';
import {Transaction} from '../../../../models';

@Component({
  selector: 'app-eu-pey-money-add',
  templateUrl: './eu-pey-money-add.component.html',
  styleUrls: ['./eu-pey-money-add.component.scss']
})
export class EuPeyMoneyAddComponent extends BaseComponent implements OnInit {

  protected transaction: Transaction;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  setTransaction(transaction: Transaction) {
    this.transaction = transaction;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
