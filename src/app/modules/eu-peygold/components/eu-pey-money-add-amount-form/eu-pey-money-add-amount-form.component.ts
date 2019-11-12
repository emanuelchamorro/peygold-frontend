import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction, TransactionType} from '../../../../models';
import {InMemoryService} from '../../../../services';
import {TransactionTypeEnum} from '../../../../enums';
import {BaseComponent} from '../../../commons-peygold/components/base-component.component';

@Component({
  selector: 'app-eu-pey-money-add-amount-form',
  templateUrl: './eu-pey-money-add-amount-form.component.html',
  styleUrls: ['./eu-pey-money-add-amount-form.component.scss']
})
export class EuPeyMoneyAddAmountFormComponent extends BaseComponent implements OnInit {

  @Output() continue: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  @Input() transaction: Transaction;

  private transactionTypes: Array<TransactionType>;

  constructor(
    private inMemoryService: InMemoryService,
  ) {
    super();
  }

  ngOnInit() {
    this.transaction = new Transaction();
    this.transaction.type = new TransactionType(TransactionTypeEnum.Fiat);
    this.transactionTypes = this.inMemoryService.transactionTypes().filter(
      (transaction: TransactionType) => transaction.value !== TransactionTypeEnum.CreditPoints
    );
  }

  /**
   * Emit the transaction to parent component
   */
  public onContinue() {
    if (this.isValidTransaction) {
      this.continue.emit(this.transaction);
    }
  }

  /**
   * Return true if the transaction has a valid type and amount.
   */
  get isValidTransaction(): boolean{
    return this.transaction.type && this.transaction.amount >= this.transaction.type.minAmount;
  }

  /**
   * Set the transaction type
   */
  setTransactionType(type: TransactionType) {
    this.transaction.type = type;
  }
}
