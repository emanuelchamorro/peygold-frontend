import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { ReportsService } from '../../../sc-peygold/services/reports.service'; //Cambiar
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { BaseComponent } from '../base.component';
import { environment } from '../../../../../environments/environment';
import { NgForm } from '@angular/forms';
import { OriginTransactionType } from '../../../../models/origin-transaction-type';
import { InMemoryService } from '../../../../services/in-memory.service';
import { Transaction, TransactionStatus, TransactionType } from '../../../../models';

@Component({
  selector: 'app-eu-pey-report-account-status',
  templateUrl: './eu-pey-report-account-status.component.html',
  styleUrls: ['./eu-pey-report-account-status.component.scss']
})
export class EuPeyReportAccountStatusComponent extends BaseComponent implements OnInit {

  private transactions: PaginationResponse;
  private detailedTransaction: any; //cambiar tipo

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;
  public selectdFilterOriginRecharge:string;
  public selectdFilterTransactionType: string;
  private exportAsConfig: ExportAsConfig;
  public startDate: string;
  public endDate: string;

  public sDateInput: string;
  public eDateInput: string;

  public originTransactionTypes: Array<OriginTransactionType>;
  public transactionTypes: Array<TransactionType>;

  constructor(private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService,
    private reportsService: ReportsService,
    private inMemoryService: InMemoryService) {
    super();
  }

  ngOnInit() {
    this.spinnerService.show();
    this.originTransactionTypes = this.inMemoryService.loadOriginRecharge;
    this.transactionTypes = this.inMemoryService.transactionTypes(false, false);
    this.reportsService.searchAccountState(1, environment.paginator.per_page).then((response: PaginationResponse) => {
      this.transactions = response;
      if (this.transactions.data.length > 0) {
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
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible cargar el estado de cuenta.");
      }
    );
  }

  /**
 * Paginator
 * @param page 
 */

  loadPage(page: number) {
    let word = this.filter;
    let type = this.selectdFilterTransactionType && this.selectdFilterTransactionType!="-1"? new TransactionType(this.selectdFilterTransactionType) : undefined;
    let startDate = this.startDate && this.startDate != undefined ? this.startDate : undefined;
    let endDate = this.endDate && this.endDate != undefined ? this.endDate : undefined;
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.reportsService.searchAccountState(page, environment.paginator.per_page, word, type, startDate, endDate).then((response: PaginationResponse) => {
      this.transactions = response;
      if (this.transactions.data.length > 0) {
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
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible cargar el estado de cuenta.");
      }
    );

  }

  /**
* Export the data to document.
* @param type Exporting type
* @return void
*/
  export(typeExport: any): void {
    console.log(typeExport);
    this.exportAsConfig = {
      type: typeExport, // the type you want to download
      elementIdOrContent: 'tableTransactions', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Estado_de_cuenta').subscribe(
      () => { },// save started
      (error) => {
        this.setError("Ha ocurrido un error. No es posible exportar el reporte en el formato seleccionado.");
      }
    );
  }

  /**
 * Show the transaction detail
 * @param transaction The transaction to show
 * @return void
 */
  showTransaction(transaction: any): void { //cambiar tipo
    this.detailedTransaction = transaction;
  }

  /**
  * search by word 
  * @param filter The word to filter
  * @return void
  */
  search(filter: string): void {
    this.setFiltersDefault();
    console.log('filter', this.filter);
    if (this.filter.length > 3) {
      this.loadPage(1);
    } else if (this.filter.length == 0) {
      this.filter = '';
      this.loadPage(1);
    }
  }


   /**
 * set filter 
 * @param filter OriginRecharge
 */
setFilterOriginRecharge(filter: string) {
  this.filter = null;
  this.selectdFilterOriginRecharge = filter && filter != '-1' ? filter : null;
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

        const d = new Date(eDate.getFullYear(), eDate.getMonth(), 0 );
        const day = d.getDate()


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

  onSubmit(){
    let startTime = '00:00:01';
    let endTime = '11:59:59';
    const sDArray = this.sDateInput.split('/');
    const eDArray = this.eDateInput.split('/');
    this.startDate = sDArray[2]+'/'+sDArray[1]+'/'+sDArray[0]+' '+startTime;
    this.endDate = eDArray[2]+'/'+eDArray[1]+'/'+eDArray[0]+' '+endTime;
    this.loadPage(1);
  }

  setFiltersDefault(){
    this.selectdFilterOriginRecharge = "-1";
    this.selectdFilterTransactionType = "-1";
    this.startDate = undefined;
    this.endDate = undefined;

  }

  resetForm(rangeForm:NgForm){
    setTimeout(() => rangeForm.resetForm({}), 1200);
  }

}
