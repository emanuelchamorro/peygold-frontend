import { Component, OnInit } from '@angular/core';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';

@Component({
  selector: 'app-eu-pey-money-add-by-cash',
  templateUrl: './eu-pey-money-add-by-cash.component.html',
  styleUrls: ['./eu-pey-money-add-by-cash.component.scss']
})
export class EuPeyMoneyAddByCashComponent extends EuPeyMoneyAddComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
