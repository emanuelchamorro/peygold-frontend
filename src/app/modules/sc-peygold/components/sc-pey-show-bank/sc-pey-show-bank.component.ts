import { Component, OnInit, Input } from '@angular/core';
import { Bank } from '../../../../models';

@Component({
  selector: 'app-sc-pey-show-bank',
  templateUrl: './sc-pey-show-bank.component.html',
  styleUrls: ['./sc-pey-show-bank.component.scss']
})
export class ScPeyShowBankComponent implements OnInit {

  @Input() bank: Bank;

  constructor() { }

  ngOnInit() {
    if (this.bank) {
      return;
    }
  }

}
