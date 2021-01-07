import { Component, OnInit } from '@angular/core';
import { Balance } from '../../../../models/balance';
import { UserService } from '../../services/user.service';
import { Transaction, TransactionStatus, TransactionType, User } from '../../../../models';
import { TransactionsService } from '../../services/transactions.service';
import { BaseComponent } from '../base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { OriginTransactionType } from '../../../../models/origin-transaction-type';
import { InMemoryService } from '../../../../services/in-memory.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { RequestTransactionsService } from '../../services/request-transactions.service';
import { Message } from '../../../commons-peygold/entities/message';
import { ErrorResponse } from '../../../commons-peygold/entities/error-response';

@Component({
  selector: 'app-eu-pey-home',
  templateUrl: './eu-pey-home.component.html',
  styleUrls: ['./eu-pey-home.component.scss']
})
export class EuPeyHomeComponent extends BaseComponent implements OnInit {

  private paginateTransactions: PaginationResponse;

  private detailedTransaction: any;
  public user:User;
  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  public creditBalance = new Balance();
  public fiatBalance = new Balance();
  public pontsBalance = new Balance();
  public transactions;

  public originTransactionTypes: Array<OriginTransactionType>;
  public transactionStatus: Array<TransactionStatus>;
  public transactionTypes: Array<TransactionType>;

  public filter: string = null;
  public selectdFilterTransactionType: string;

  protected filtersOriginRechargeDefault: Array<any> = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  protected filtersTransationStatusDefault: Array<any> = [1, 2, 3, 4];

  protected filtersOriginRecharge: Array<any>;
  protected filtersTransationStatus: Array<any>;

  public startDate: string;
  public endDate: string;

  public sDateInput: string;
  public eDateInput: string;

  constructor(
    private userService: UserService,
    private transactionsService: TransactionsService,
    private spinnerService: NgxSpinnerService,
    private inMemoryService: InMemoryService,
    private authService: AuthService,
    private requestTransactionsService: RequestTransactionsService
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
    this.user = this.authService.user();
    this.setFiltersDefault()
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

      this.transactionsService.searchGenericTransaction(this.params(null, null, this.selectdFilterTransactionType, 1, 10, this.filtersTransationStatusDefault, this.filtersOriginRechargeDefault, this.filter), this.user).then(
        (response: PaginationResponse) => {
          this.paginateTransactions = response;

          this.originTransactionTypes = this.inMemoryService.loadOriginRecharge;
          this.transactionStatus = this.inMemoryService.loadTransactionStatus;
          this.transactionTypes = this.inMemoryService.transactionTypes(false, true);
          if (this.paginateTransactions.data.length > 0) {
            this.transactions = this.paginateTransactions.data;
            this.page = response.page;
            this.previousPage = 1;
            this.totalItems = response.count;
            this.showPagination = true;
          } else {
            this.page = 1;
            this.previousPage = 1;
            this.totalItems = 0;
            this.showPagination = false;
          }
          this.spinnerService.hide();
          this.unbusy();
        }).catch((error) => {
          this.spinnerService.hide();
          console.log(error);
          this.unbusy();
        });
    }).catch(() => {
      this.spinnerService.hide();
      console.log();
      this.unbusy();
    });
  }


  /**
 * set filter 
 * @param filter OriginRecharge
 */
  setFilterOriginRecharge(filter: string) {
    this.filtersOriginRecharge = [];
    this.filter = null;
    if (filter) {
      switch (parseInt(filter)) {
        case (-1): //todos los estados
          this.filtersOriginRecharge = this.filtersOriginRechargeDefault;
          break;
        case (10):
          this.filtersOriginRecharge.push(10);
          break;
        case (5)://8,7,3,9
          this.filtersOriginRecharge.push(8, 7, 3, 9);
          break;
        case (2):
          this.filtersOriginRecharge = this.filtersOriginRechargeDefault;
          break;
        case (4)://creditos
          this.filtersOriginRecharge = this.filtersOriginRechargeDefault;
          break;
        default:
          this.filtersOriginRecharge.push(parseInt(filter));
          break;
      }
    } else {
      this.filtersOriginRecharge = this.filtersOriginRechargeDefault;
    }
    this.loadPage(1);
  }


  /**
* set filter 
* @param filter TransactionState
*/
  setFilterTransactionState(filter: string) {
    this.filter = null;
    this.filtersTransationStatus = [];
    if (filter) {
      switch (parseInt(filter)) {
        case (-1)://todos los estados
          this.filtersTransationStatus = this.filtersTransationStatusDefault;
          break;
        case (4)://Cancelados
          this.filtersTransationStatus = this.filtersTransationStatusDefault;
          break;
        case (5)://Devueltos
          this.filtersTransationStatus = this.filtersTransationStatusDefault;
          break;
        default:
          this.filtersTransationStatus.push(parseInt(filter));
          break;
      }
    } else { //todos los estados
      this.filtersTransationStatus = this.filtersTransationStatusDefault;
    }
    this.loadPage(1);
  }

  /**
* set filter 
* @param filter TransactionType
*/
  setFilterTransactionType(filter: string) {
    this.filter = null;
    this.selectdFilterTransactionType = filter && filter != '-1' ? filter : null;
    this.loadPage(1);
  }


  /**
 * search loans by word
 * @param filter 
 */
  search(filter: string) {
    this.setFiltersDefault();
    if (this.filter.length > 3) {
      this.loadPage(1);
    } else if (this.filter.length == 0) {
      this.filter = '';
      //  this.selectFilter = '';
      this.loadPage(1);
    }
  }

  setFiltersDefault() {
    this.filtersOriginRecharge = this.filtersOriginRechargeDefault;
    this.filtersTransationStatus = this.filtersTransationStatusDefault;
    this.selectdFilterTransactionType = undefined;
    this.startDate = undefined;
    this.endDate = undefined;

  }


  /**
 * set filter by range dates
 * @param range 
 */
  setFilterRange(range: number) {

    let startTime = '00:00:01';
    let endTime = '11:59:59';
    let sDate = new Date();
    let eDate = new Date();

    switch (range) {

      case (0): //hoy        
        this.startDate = sDate.getFullYear() + '-' + (sDate.getMonth() + 1 > 9 ? sDate.getMonth() + 1 : '0' + (sDate.getMonth() + 1)) + '-' + (sDate.getDate() > 9 ? sDate.getDate() : '0' + sDate.getDate()) + ' ' + startTime;
        this.endDate = eDate.getFullYear() + '-' + (eDate.getMonth() + 1 > 9 ? eDate.getMonth() + 1 : '0' + (eDate.getMonth() + 1)) + '-' + (eDate.getDate() > 9 ? eDate.getDate() : '0' + eDate.getDate()) + ' ' + endTime;
        console.log(this.startDate);
        console.log(this.endDate);
        break;

      case (1): // ayer
        sDate.setDate(sDate.getDate() - 1);
        eDate.setDate(eDate.getDate() - 1);
        this.startDate = sDate.getFullYear() + '-' + (sDate.getMonth() + 1 > 9 ? sDate.getMonth() + 1 : '0' + (sDate.getMonth() + 1)) + '-' + (sDate.getDate() > 9 ? sDate.getDate() : '0' + sDate.getDate()) + ' ' + startTime;
        this.endDate = eDate.getFullYear() + '-' + (eDate.getMonth() + 1 > 9 ? eDate.getMonth() + 1 : '0' + (eDate.getMonth() + 1)) + '-' + (eDate.getDate() > 9 ? eDate.getDate() : '0' + eDate.getDate()) + ' ' + endTime;
        console.log(this.startDate);
        console.log(this.endDate);
        break;

      case (2): //mes pasado
        sDate.setMonth(sDate.getMonth() - 1);
        sDate.setDate(1);
        eDate.setMonth(eDate.getMonth() - 1);

        const d = new Date(eDate.getFullYear(), eDate.getMonth()+1, 0);
        const day = d.getDate()
        eDate.setDate(day);

        this.startDate = sDate.getFullYear() + '-' + (sDate.getMonth() + 1 > 9 ? sDate.getMonth() + 1 : '0' + (sDate.getMonth() + 1)) + '-' + (sDate.getDate() > 9 ? sDate.getDate() : '0' + sDate.getDate()) + ' ' + startTime;
        this.endDate = eDate.getFullYear() + '-' + (eDate.getMonth() + 1 > 9 ? eDate.getMonth() + 1 : '0' + (eDate.getMonth() + 1)) + '-' + (eDate.getDate() > 9 ? eDate.getDate() : '0' + eDate.getDate()) + ' ' + endTime;
        console.log(this.startDate);
        console.log(this.endDate);
        break;

      default:
        this.startDate = undefined;
        this.endDate = undefined;
        break;

    }
    this.loadPage(1);

  }

  /**
* load page de loans
* @param page 
*/
  loadPage(page: number) {

    this.previousPage = page - 1;
    this.spinnerService.show();
    let params;

    if (this.filter && this.filter != '') {
      params = this.params(this.startDate, this.endDate, this.selectdFilterTransactionType, page, environment.paginator.per_page, this.filtersTransationStatusDefault, this.filtersOriginRechargeDefault, this.filter)
    } else {
      params = this.params(this.startDate, this.endDate, this.selectdFilterTransactionType, page, environment.paginator.per_page, this.filtersTransationStatus, this.filtersOriginRecharge, this.filter);
    }

    this.transactionsService.searchGenericTransaction(params, this.user ).then(
      (response: PaginationResponse) => {
        this.paginateTransactions = response;

        if (this.paginateTransactions.data.length > 0) {
          this.transactions = this.paginateTransactions.data;
          this.page = response.page;
          this.previousPage = 1;
          this.totalItems = response.count;
          this.showPagination = true;
        } else {
          this.page = 1;
          this.previousPage = 1;
          this.totalItems = 0;
          this.showPagination = false;
        }
        this.spinnerService.hide();
        this.unbusy();
      }).catch((error) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.unbusy();
      });

  }


  paramsDefault(): any {
    this.params("2020-07-01 00:00:01", "2020-07-31 11:59:59", null, 1, environment.paginator.per_page, this.filtersTransationStatusDefault, this.filtersOriginRechargeDefault, this.filter);
  }
  /**
   * Get params 
   */
  params(startDate: string, endDate: string, idTransactionType: string, page: number, perPage: number, statusArray: Array<any>, originRechargeArray: Array<any>, word: string): any {
    let params: any = {}

    if (startDate && endDate) {
      params.Desde = startDate;
      params.Hasta = endDate;
    } else {
      let startTime = '00:00:01';
      let endTime = '23:59:59';
      let sDate = new Date();
      let eDate = new Date();
      params.Desde = sDate.getFullYear() + '-' + (sDate.getMonth() + 1 > 9 ? sDate.getMonth() + 1 : '0' + (sDate.getMonth() + 1)) + '-' + (sDate.getDate() > 9 ? sDate.getDate() : '0' + sDate.getDate()) + ' ' + startTime;
      params.Hasta = eDate.getFullYear() + '-' + (eDate.getMonth() + 1 > 9 ? eDate.getMonth() + 1 : '0' + (eDate.getMonth() + 1)) + '-' + (eDate.getDate() > 9 ? eDate.getDate() : '0' + eDate.getDate()) + ' ' + endTime;

    }
    if (idTransactionType) {
      params.IdTransactionType = idTransactionType;
    }

    if (word) {
      params.Words = word;
    }

    params.Page = page;
    params.Size = perPage;
    params.Status = statusArray;
    params.OriginRecharge = originRechargeArray;
    return params;

  }

  onSubmit() {
    let startTime = '00:00:01';
    let endTime = '11:59:59';
    const sDArray = this.sDateInput.split('/');
    const eDArray = this.eDateInput.split('/');
    this.startDate = sDArray[2] + '/' + sDArray[1] + '/' + sDArray[0] + ' ' + startTime;
    this.endDate = eDArray[2] + '/' + eDArray[1] + '/' + eDArray[0] + ' ' + endTime;
    console.log(this.startDate);
    console.log(this.endDate);
    this.loadPage(1);
  }

  resetForm(rangeForm: NgForm) {
    setTimeout(() => rangeForm.resetForm({}), 1200);
  }


  /**
* set the transaction detail
* @param transaction The transaction to show
* @return void
*/
setTransaction(transaction: any): void { //cambiar tipo
    this.detailedTransaction = transaction;
  }


  /**
   * Proccess the transaction.
   * @return void;
   */
  upadateRequest(statusId:string) {

    this.spinnerService.show();
    const status = new TransactionStatus(statusId);
    this.detailedTransaction.status = status;
    this.detailedTransaction.processedComments = status.id == '2' ? "Se aprueba solicitu de pago" : "Se rechaza solicitud de pago"
    this.requestTransactionsService.update(this.detailedTransaction).then(() => {

      let message = this.detailedTransaction.status.value == '2' ? new Message(
        '¡El pago fue enviado!',
        `Has pagado exitosamente a <b>${this.detailedTransaction.receiver.completeName}</b>. ` +
        'El importe fue descontado de tus billeteras Peygold, veras las operaciones reflejadas en "Movimientos"'
      ) : new Message(
        '¡El pago fue enviado!',
        `Rechazaste la solicitud de pago de <b>${this.detailedTransaction.receiver.completeName} y </b>. ` +
        'ya no aparecerá como pendiente.'
      );
      this.spinnerService.hide();
      this.detailedTransaction = null;
      this.showSuccessFeedback(message);
    }).catch((e: ErrorResponse) => {
      this.spinnerService.hide();
      this.submitted = false;
      const message = e.message || 'No es posible realizar la transacción';
      this.setError(message);
    });
  }


/**
 * cancel request
 */
  cancelRequest(){
    if(this.detailedTransaction){
      this.spinnerService.show();
      this.detailedTransaction.status =  new TransactionStatus('4');
      this.detailedTransaction.processedComments = 'Transacción cancelada por el usuario.'
      this.requestTransactionsService.update(this.detailedTransaction).then(() => {
        this.spinnerService.hide();
      }).catch((e: ErrorResponse) => {
        this.spinnerService.hide();
        const message = e.message || 'No es posible realizar la transacción';
        this.setError(message);
      });
    }
  }

}
