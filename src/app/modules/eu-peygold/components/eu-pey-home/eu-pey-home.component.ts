import { Component, OnInit } from '@angular/core';
import {Balance} from '../../../../models/balance';
import {UserService} from '../../services/user.service';
import {Transaction} from '../../../../models';
import {TransactionsService} from '../../services/transactions.service';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-eu-pey-home',
  templateUrl: './eu-pey-home.component.html',
  styleUrls: ['./eu-pey-home.component.scss']
})
export class EuPeyHomeComponent extends BaseComponent implements OnInit {

  public creditBalance = new Balance();
  public fiatBalance = new Balance();
  public transactions;

  constructor(
    private userService: UserService,
    private transactionsService: TransactionsService,
  ) {
    super();
  }

  /**
   * On Init implementation
   */
  ngOnInit() {
    // Get the user balance
    this.busy();
    this.userService.balances().then((balances: Array<Balance>) => {
      balances.map((balance: Balance) => {
        if (balance.isFiat) {
          this.fiatBalance = balance;
          return;
        }

        if (balance.isCredit) {
          this.creditBalance = balance;
          return;
        }
      });

      // Search the current transactions.
      this.transactionsService.search().then(
        (transactions: Array<Transaction>) => {
          this.transactions = transactions;
          this.busy();
        }).catch(() => {
        this.unbusy();
      });
    }).catch(() => {
      this.unbusy();
    });
  }
}
