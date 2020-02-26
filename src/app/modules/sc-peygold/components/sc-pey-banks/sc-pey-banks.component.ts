import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { Bank } from '../../../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-sc-pey-banks',
  templateUrl: './sc-pey-banks.component.html',
  styleUrls: ['./sc-pey-banks.component.scss']
})
export class ScPeyBanksComponent extends BaseComponent implements OnInit {

  private banks: PaginationResponse;
  private detailedBank: Bank;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;

  private exportAsConfig: ExportAsConfig;
  private completed:boolean;

  constructor(private spinnerService: NgxSpinnerService,
              private exportAsService: ExportAsService) {
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
      elementId: 'tableBanks', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Bancos').subscribe(
      () => {},// save started
      (error) => {
        this.setError("No es posible exportar el reporte en el formato seleccionado.");
      }
      );
  }

  /**
   * Show the bank detail
   * @param bank The bank to show
   * @return void
   */
  showBank(bank: Bank): void {
    this.getBank(Number(bank.id));
  }

    /**
   * Get the bank info by the id.
   * @param id bank id
  */
  private getBank(id: number): void {
    //TODO CALL SERVICE
    this.detailedBank = new Bank();
    this.completed = true;
  }

    /**
   * add bank 
   * @param bank The bank to add
   * @return void
   */
  add(bank: Bank): void {
    bank.deleted = false;
    //TODO CALL SERVICE
  }

  /**
   * delete bank 
   * @param bank The bank to delete
   * @return void
   */

  delete(bank: Bank): void {
    bank.deleted = true;
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
