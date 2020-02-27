import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { GeneralChargeCredit } from '../../../../models/general-charge-credit';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';

@Component({
  selector: 'app-sc-pey-province-charges-credits',
  templateUrl: './sc-pey-province-charges-credits.component.html',
  styleUrls: ['./sc-pey-province-charges-credits.component.scss']
})
export class ScPeyProvinceChargesCreditsComponent extends BaseComponent implements OnInit {

  private generalChargesCredits: PaginationResponse;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;

  private exportAsConfig: ExportAsConfig;
  private completed:boolean;

  constructor(
    private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService
  ) { 
    super();
  }

  ngOnInit() {
    this.completed = false;
    //TODO CALL SERVICE
  }

  loadPage(page: number) {
    //TODO CALL SERVICE
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
    //TODO CALL SERVICE
  }

  /**
   * delete generalChargeCredit 
   * @param generalChargeCredit The generalChargeCredit to delete
   * @return void
   */

  delete(generalChargeCredit: GeneralChargeCredit): void {
    generalChargeCredit.deleted = true;
    //TODO CALL SERVICE
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
