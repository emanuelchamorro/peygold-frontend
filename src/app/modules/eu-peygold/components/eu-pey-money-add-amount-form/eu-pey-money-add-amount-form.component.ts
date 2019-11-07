import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction} from '../../../../models';

@Component({
  selector: 'app-eu-pey-money-add-amount-form',
  templateUrl: './eu-pey-money-add-amount-form.component.html',
  styleUrls: ['./eu-pey-money-add-amount-form.component.scss']
})
export class EuPeyMoneyAddAmountFormComponent implements OnInit {

  @Output() continue: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  @Input() transaction: Transaction;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Emit the transaction to parent component
   */
  public onContinue() {
    const transaction = new Transaction();
    this.continue.emit(transaction);
  }

}
