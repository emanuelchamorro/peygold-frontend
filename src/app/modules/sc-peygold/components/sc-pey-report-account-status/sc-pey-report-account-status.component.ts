import { Component, OnInit } from '@angular/core';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { NgxSpinnerService } from 'ngx-spinner';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-sc-pey-report-account-status',
  templateUrl: './sc-pey-report-account-status.component.html',
  styleUrls: ['./sc-pey-report-account-status.component.scss']
})
export class ScPeyReportAccountStatusComponent extends BaseComponent implements OnInit {

  private transactions: PaginationResponse;
  private detailedTransaction: any; //cambiar tipo

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;
  private exportAsConfig: ExportAsConfig;

  constructor(private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService) {
    super();
  }

  ngOnInit() {

    /*  this.spinnerService.show();
      this.insuranceCarrierService.search(1, environment.paginator.per_page, undefined).then((response: PaginationResponse) => {
        this.insurancecarriers = response;
        if (this.insurancecarriers.data.length > 0) {
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
          this.setError("Ha ocurrido un error. No es posible cargar las aseguradoras.");
        }
      );*/

  }

  loadPage(page: number) {
    let word = (this.filter && this.filter != '') ? this.filter : undefined;
    this.previousPage = page - 1;
    /*  this.spinnerService.show();
     this.insuranceCarrierService.search(page, environment.paginator.per_page, word).then((response: PaginationResponse) => {
       console.log('creditos', response)
       this.insurancecarriers = response;
 
       if (this.insurancecarriers.data.length > 0) {
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
         this.setError("Ha ocurrido un error. No es posible cargar las aseguradoras.");
       }
     );*/

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
      elementId: 'tableTransactions', // the id of html/table element
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
    this.getTransaction(transaction.id);
  }


  /**
 * Get the transaction info by the id.
 * @param id transaction id
*/
  private getTransaction(id: number): void {
    /* this.spinnerService.show();
     this.insuranceCarrierService.getById(id).then((insurancecarrier: InsuranceCarrier) => {
       if (insurancecarrier) {
         this.detailedInsuranceCarrier = insurancecarrier;
         console.log('detailedInsuranceCarrier', this.detailedInsuranceCarrier);
         if (this.detailedInsuranceCarrier.address.country) {
           this.locationService.getStates(this.detailedInsuranceCarrier.address.country).then((states: Array<State>) => {
             this.detailedInsuranceCarrier.address.state = states.filter(x => x.value == this.detailedInsuranceCarrier.address.state.value)[0];
             if (this.detailedInsuranceCarrier.address.state) {
               this.locationService.getCities(this.detailedInsuranceCarrier.address.state).then((cities: Array<City>) => {
                 this.completed = true;
                 this.spinnerService.hide();
                 this.detailedInsuranceCarrier.address.city = cities.filter(x => x.value == this.detailedInsuranceCarrier.address.city.value)[0];
               }).catch(() => {
                 this.spinnerService.hide();
                 this.completed = false;
                 this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
               });
             }
           }).catch(() => {
             this.spinnerService.hide();
             this.completed = false;
             this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
           });
         }
       } else {
         this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
       }
     }).catch(
       (error) => {
         this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la aseguradora.");
       }
     );*/
  }


    /**
   * search by word 
   * @param filter The word to filter
   * @return void
   */
  search(filter: string): void {
    console.log('filter', this.filter);
    if (this.filter.length > 3) {
      this.loadPage(1);
    } else if (this.filter.length == 0) {
      this.filter = '';
      this.loadPage(1);
    }
  }

}
