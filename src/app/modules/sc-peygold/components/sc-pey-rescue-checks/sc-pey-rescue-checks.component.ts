import { Component, OnInit } from '@angular/core';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { CheckRescue } from '../../../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-sc-pey-rescue-checks',
  templateUrl: './sc-pey-rescue-checks.component.html',
  styleUrls: ['./sc-pey-rescue-checks.component.scss']
})
export class ScPeyRescueChecksComponent extends BaseComponent implements OnInit {

  private rescuechecks: PaginationResponse;


  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;

  private exportAsConfig: ExportAsConfig;
  private completed: boolean;

  constructor(private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService) {
    super();
  }

  ngOnInit() {
    this.completed = false;
    //TODO CALL SERVICE
  }


  /** 
   * paginate table
   * @param page
   * @returns void
  */
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
      elementId: 'tableRescueChecks', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Rescate de cheques').subscribe(
      () => { },// save started
      (error) => {
        this.setError("No es posible exportar el reporte en el formato seleccionado.");
      }
    );
  }

  /**
   * add checkRescue 
   * @param checkRescue The checkRescue to add
   * @return void
   */
  add(checkRescue: CheckRescue): void {
    checkRescue.deleted = false;
    //TODO CALL SERVICE
  }

  /**
   * delete checkRescue 
   * @param checkRescue The checkRescue to delete
   * @return void
   */

  delete(checkRescue: CheckRescue): void {
    checkRescue.deleted = true;
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
