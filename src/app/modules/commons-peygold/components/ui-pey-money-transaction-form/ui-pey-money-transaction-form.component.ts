import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction, TransactionType, User} from '../../../../models';
import {TransactionTypeEnum} from '../../../../enums';
import {BaseComponent} from '../base-component.component';
import {InMemoryService} from '../../../../services';

@Component({
  selector: 'app-ui-pey-money-transaction-form',
  templateUrl: './ui-pey-money-transaction-form.component.html',
  styleUrls: ['./ui-pey-money-transaction-form.component.scss']
})
export class UIPeyMoneyTransactionFormComponent extends BaseComponent implements OnInit {

  @Output()
  public continue: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  @Input()
  public transaction: Transaction = new Transaction();

  @Input()
  public buttonLabel = 'Continue';

  @Input()
  public type = 'request';

  private transactionTypes: Array<TransactionType>;

  /**
   * UIPeyMoneyTransactionFormComponent
   */
  constructor(
    private inMemoryService: InMemoryService
  ) {
    super();
  }

  /**
   * On Oinit implementation
   */
  ngOnInit() {
    if (! this.transaction.type) {
      this.transaction.type = new TransactionType(TransactionTypeEnum.Fiat);
    }
    this.transactionTypes = this.inMemoryService.transactionTypes();
  }


  /**
   * Emit the transaction to parent component
   */
  public emitTransaction() {
    if (this.isValidTransaction) {
      this.continue.emit(this.transaction);
    }
  }

  /**
   * Return true if the transaction has a valid type, amount and selected a user.
   */
  get isValidTransaction(): boolean {
    return this.transaction.type
      && this.transaction.amount >= this.transaction.type.minAmount
      && this.transaction.reason
      && (this.transaction.receiver !== null || this.transaction.sender !== null);
  }

  /**
   * Set the user in the transaction.
   * @param user The user transaction.
   */
  setUser(user: User) {
    if (this.type === 'request') {
      this.transaction.sender = user;
    }

    this.transaction.receiver = user;
  }
}
