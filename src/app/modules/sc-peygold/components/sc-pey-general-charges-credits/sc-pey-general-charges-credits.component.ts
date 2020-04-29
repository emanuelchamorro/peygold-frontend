import { Component, OnInit } from '@angular/core';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { BaseComponent } from '../base.component';
import { GeneralChargeCredit } from '../../../../models/general-charge-credit';
import { ChargecreditService } from '../../services/chargecredit.service';
import { environment } from '../../../../../environments/environment'; 
import { ChargeCreditFactory } from '../../../../factory/chargecredit-factory';

@Component({
  selector: 'app-sc-pey-general-charges-credits',
  templateUrl: './sc-pey-general-charges-credits.component.html',
  styleUrls: ['./sc-pey-general-charges-credits.component.scss']
})
export class ScPeyGeneralChargesCreditsComponent extends BaseComponent implements OnInit {

  private generalChargesCredits: PaginationResponse;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;

  private exportAsConfig: ExportAsConfig;


  constructor(private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService,
    private chargecreditService: ChargecreditService) {
      super();
    }

  ngOnInit() {

    this.spinnerService.show();
    this.chargecreditService.search(1, 1,environment.paginator.per_page, undefined).then((response: PaginationResponse) => {
      this.generalChargesCredits = response;

      if (this.generalChargesCredits.data.length > 0) {
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
        this.setError("No es posible cargar los cargos y abonos.");
      }
    );
  }


  loadPage(page: number) {
    let word = (this.filter && this.filter != '') ? this.filter : undefined;
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.chargecreditService.search(1, page, environment.paginator.per_page, word).then((response: PaginationResponse) => {

      this.generalChargesCredits = response;

      if (this.generalChargesCredits.data.length > 0) {
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
        this.setError("No es posible cargar los cargos y abonos.");
      }
    )
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
      elementId: 'tableGeneralChargeCredit', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Bancos').subscribe(
      () => {},// save started
      (error) => {
        this.setError("No es posible exportar el reporte en el formato seleccionado.");
      }
      );
  }


      /**
   * add generalChargeCredit 
   * @param generalChargeCredit The generalChargeCredit to add
   * @return void
   */
  add(generalChargeCredit: GeneralChargeCredit): void {
    generalChargeCredit.deleted = false;
    this.spinnerService.show();
    this.chargecreditService.update(ChargeCreditFactory.make(generalChargeCredit, 1), 1).then(
      (chargeCredit:GeneralChargeCredit) => {
        this.spinnerService.hide();
        if(!chargeCredit){
          this.setError("Ha ocurrido un error. No es posible agregar la entidad.");
        }

      }
    ).catch(
      (error) => { 
        this.setError("Ha ocurrido un error. No es posible agregar la entidad.");
      }
    );
  }

  /**
   * delete generalChargeCredit 
   * @param generalChargeCredit The generalChargeCredit to delete
   * @return void
   */

  delete(generalChargeCredit: GeneralChargeCredit): void {
    generalChargeCredit.deleted = true;
    this.spinnerService.show();
    this.chargecreditService.update(ChargeCreditFactory.make(generalChargeCredit, 1), 1).then(
      (chargeCredit:GeneralChargeCredit) => {
        this.spinnerService.hide();
        if(!chargeCredit){
          this.setError("Ha ocurrido un error. No es posible agregar la entidad.");
        }

      }
    ).catch(
      (error) => { 
        this.setError("Ha ocurrido un error. No es posible agregar la entidad.");
      }
    );
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
