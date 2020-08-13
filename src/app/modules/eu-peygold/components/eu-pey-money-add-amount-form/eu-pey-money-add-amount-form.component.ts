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

  @Input()
  icon: string;

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  multipey: false;

  @Input()
  creditPoints: false;

  @Output()
  continue: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  @Input()
  transaction: Transaction;

  private transactionTypes: Array<TransactionType>;

  constructor(
    private inMemoryService: InMemoryService,
  ) {
    super();
  }

  ngOnInit() {
    this.transaction = new Transaction();
    this.transaction.type = new TransactionType(TransactionTypeEnum.Fiat);
    this.transactionTypes = this.inMemoryService.transactionTypes(this.multipey, this.creditPoints);
    if (this.multipey) {
      this.transaction.multiPey = [
        Transaction.createFromType(TransactionTypeEnum.Fiat),
        Transaction.createFromType(TransactionTypeEnum.Points),
      ];
    }
  }

  /**
   * Emit the transaction to parent component
   */
  public onContinue() {
    if (this.isValidTransaction(this.transaction)
      || (this.multipey
        && this.isValidTransaction(this.transaction.multiPey[0])
        && this.isValidTransaction(this.transaction.multiPey[1])
      )) {

      if (!this.transaction.type.isMultiPey) {
        this.transaction.multiPey = null;
      }

      this.continue.emit(this.transaction);
    }
  }

  /**
   * Return true if the transaction has a valid type and amount.
   */
  isValidTransaction(transaction: Transaction): boolean {
    return transaction.type && transaction.amount >= transaction.type.minAmount;
  }

  /**
   * Set the transaction type
   */
  setTransactionType(type: TransactionType) {
    this.transaction.type = type;
  }
}
