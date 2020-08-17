import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Transaction, TransactionType, User} from '../../../../models';
import {TransactionTypeEnum} from '../../../../enums';
import {BaseComponent} from '../base-component.component';
import {InMemoryService} from '../../../../services';
import {AuthService} from '../../../auth-peygold/services/auth.service';

@Component({
  selector: 'app-ui-pey-money-transaction-form',
  templateUrl: './ui-pey-money-transaction-form.component.html',
  styleUrls: ['./ui-pey-money-transaction-form.component.scss']
})
export class UIPeyMoneyTransactionFormComponent extends BaseComponent implements OnInit {

  @Output()
  public continue: EventEmitter<Transaction> = new EventEmitter<Transaction>();

  @Input()
  public transaction: Transaction;

  @Input()
  public startedByUser: User;

  @Input()
  public buttonLabel = 'Continue';

  @Input()
  public type = 'request';

  @Input()
  public disabled = false;

  @Input()
  public multipey:boolean;

  @Input()
  creditPoints: boolean;


  private transactionTypes: Array<TransactionType>;

  /**
   * UIPeyMoneyTransactionFormComponent
   */
  constructor(
    private inMemoryService: InMemoryService,
    private authService: AuthService,
  ) {
    super();
  }

  /**
   * On Oinit implementation
   */
  ngOnInit() {
    if (!this.transaction) {
      this.transaction = new Transaction();
    }

    if (! this.transaction.type) {
      this.transaction.type = new TransactionType(TransactionTypeEnum.Fiat);
    }

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
  public emitTransaction() {
    console.log('transac', this.transaction);
    if ((this.type === 'request' && this.transaction.isValidToRequestMoney) || this.transaction.isValidToSendMoney) {
      this.continue.emit(this.transaction);
    }
  }

  /**
   * Set the user in the transaction.
   * @param user The user transaction.
   * @return void;
   */
  setUser(user: User) {
    console.log(user);
    if (this.type === 'request') {
      this.transaction.sender = user;
      this.transaction.receiver = this.startedByUser;
      return;
    }

    this.transaction.receiver = user;
    this.transaction.sender = this.startedByUser;
  }
}
