import { Component, OnInit } from '@angular/core';
import {Balance} from '../../../../models/balance';
import {UserService} from '../../services/user.service';
import {Transaction, TransactionStatus, TransactionType} from '../../../../models';
import {TransactionsService} from '../../services/transactions.service';
import {BaseComponent} from '../base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { OriginTransactionType } from '../../../../models/origin-transaction-type';
import {InMemoryService} from '../../../../services/in-memory.service';

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
  public pontsBalance = new Balance();
  public transactions;

  public originTransactionTypes:Array<OriginTransactionType>;
  public transactionStatus: Array<TransactionStatus>;
  public transactionTypes: Array<TransactionType>;

  public filter:string;
  public selectdFilterOriginRecharge:string;
  public selectdFilterTransationState:string;
  public selectdFilterTransactionType:string;

  constructor(
    private userService: UserService,
    private transactionsService: TransactionsService,
    private spinnerService:NgxSpinnerService,
    private inMemoryService:InMemoryService
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

        if (balance.isPoints) {
          this.pontsBalance = balance;
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
          console.log(this.transactions);
          this.spinnerService.hide();
          if(transactions){
            this.page = 1;
            this.previousPage = 1;
            this.totalItems = (this.page * 10) + 1;
            this.showPagination = true;
            this.originTransactionTypes = this.inMemoryService.loadOriginRecharge;
            this.transactionStatus = this.inMemoryService.loadTransactionStatus;
            this.transactionTypes = this.inMemoryService.transactionTypes(false,true);
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


    /**
   * set filter 
   * @param filter OriginRecharge
   */
  setFilterOriginRecharge(filter:string){
    this.filter = '';
    this.selectdFilterOriginRecharge = filter;
    console.log(filter)
    this.loadPage(1);
  }


      /**
   * set filter 
   * @param filter TransactionState
   */
  setFilterTransactionState(filter:string){
    this.filter = '';
    this.selectdFilterTransationState = filter;
    console.log(filter)
    this.loadPage(1);
  }

      /**
   * set filter 
   * @param filter TransactionType
   */
  setFilterTransactionType(filter:string){
    this.filter = '';
    this.selectdFilterTransactionType = filter;
    console.log(filter)
    this.loadPage(1);
  }


    /**
   * search loans by word
   * @param filter 
   */
  search(filter:string){
    console.log('filter',this.filter);
    //this.selectFilter = '';
    if(this.filter.length>3){
      this.loadPage(1);
    }else if(this.filter.length == 0){
      this.filter = '';
    //  this.selectFilter = '';
      this.loadPage(1);
    }
  }

      /**
   * load page de loans
   * @param page 
   */
  loadPage(page: number) {

  /*  let word = (this.selectFilter && this.selectFilter!='') ? this.selectFilter : (this.filter && this.filter!='') ? this.filter: '@' ;
    console.log('word',word);
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.loansService.search(new TransactionType(), word, page, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.loans = response;
     
      if(this.loans.data.length){
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        console.log('count record', this.totalItems);
        this.showPagination = true;
      }else{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro)=>{
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
      }
    )*/

  }
}
