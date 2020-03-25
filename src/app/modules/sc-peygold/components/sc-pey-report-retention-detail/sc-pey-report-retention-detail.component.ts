import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-sc-pey-report-retention-detail',
  templateUrl: './sc-pey-report-retention-detail.component.html',
  styleUrls: ['./sc-pey-report-retention-detail.component.scss']
})
export class ScPeyReportRetentionDetailComponent extends BaseComponent implements OnInit {

  private details: PaginationResponse;
  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
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
  //  let word = (this.filter && this.filter != '') ? this.filter : undefined;
    this.previousPage = page - 1;
   /* this.spinnerService.show();
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
      elementId: 'tableDetails', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Detalles_retenciones').subscribe(
      () => { },// save started
      (error) => {
        this.setError("Ha ocurrido un error. No es posible exportar el reporte en el formato seleccionado.");
      }
    );
  }

}
