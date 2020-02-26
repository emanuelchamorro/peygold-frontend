import { Component, OnInit } from '@angular/core';
import {Balance} from '../../../../models/balance';
import {UserService} from '../../services/user.service';
import {Transaction} from '../../../../models';
import {TransactionsService} from '../../services/transactions.service';
import {BaseComponent} from '../base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-eu-pey-home',
  templateUrl: './eu-pey-home.component.html',
  styleUrls: ['./eu-pey-home.component.scss']
})
export class EuPeyHomeComponent extends BaseComponent implements OnInit {


  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  public creditBalance = new Balance();
  public fiatBalance = new Balance();
  public transactions;

  constructor(
    private userService: UserService,
    private transactionsService: TransactionsService,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  /**
   * On Init implementation
   */
  ngOnInit() {
    // Get the user balance
    this.busy();
    this.spinnerService.show();
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
    
      this.transactionsService.search(1, environment.paginator.per_page).then(
        (transactions: Array<Transaction>) => {
          this.transactions = transactions;
          this.spinnerService.hide();
          if(transactions){
            this.page = 1;
            this.previousPage = 1;
            this.totalItems = (this.page * 10) + 1;
            this.showPagination = true;
          }else{
            this.page = 1;
            this.previousPage = 1;
            this.totalItems = 0;
            this.showPagination = false;
          }
          this.unbusy();
        }).catch(() => {
          this.spinnerService.hide();
        this.unbusy();
      });
    }).catch(() => {
      this.spinnerService.hide();
      this.unbusy();
    });
  }
}
