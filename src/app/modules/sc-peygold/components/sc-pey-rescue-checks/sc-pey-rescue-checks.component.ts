import { Component, OnInit } from '@angular/core';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { CheckRescue } from '../../../../models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { BaseComponent } from '../base.component'; 
import { RescuecheckService } from '../../services/rescuecheck.service';
import { environment } from '../../../../../environments/environment';
import { CheckRescueFactory } from '../../../../factory/checkrescue-factory';

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


  constructor(private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService,
    private rescuecheckService: RescuecheckService) {
    super();
  }

  ngOnInit() {

    this.spinnerService.show();
    this.rescuecheckService.search(1,environment.paginator.per_page, undefined).then((response: PaginationResponse) => {
      this.rescuechecks = response;
      if (this.rescuechecks.data.length > 0) {
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
        this.setError("No es posible cargar los tipos de rescate de cheque.");
      }
    );
  }


  /** 
   * paginate table
   * @param page
   * @returns void
  */
  loadPage(page: number) {
    let word = (this.filter && this.filter != '') ? this.filter : undefined;
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.rescuecheckService.search(page, environment.paginator.per_page, word).then((response: PaginationResponse) => {
      console.log('creditos', response)
      this.rescuechecks = response;

      if (this.rescuechecks.data.length > 0) {
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
        this.setError("No es posible cargar los tipos de rescate de cheque.");
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
    this.spinnerService.show();
    this.rescuecheckService.update(CheckRescueFactory.make(checkRescue)).then(
      (checkRescue:CheckRescue) => {
        this.spinnerService.hide();
        if(!checkRescue){
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
   * delete checkRescue 
   * @param checkRescue The checkRescue to delete
   * @return void
   */

  delete(checkRescue: CheckRescue): void {
    checkRescue.deleted = true;
    this.spinnerService.show();
    this.rescuecheckService.update(CheckRescueFactory.make(checkRescue)).then(
      (checkRescue:CheckRescue) => { 
        this.spinnerService.hide();
        if(!checkRescue){
          this.setError("Ha ocurrido un error. No es posible eliminar la entidad.");
        }
      }
    ).catch(
      (error) => { 
        this.setError("Ha ocurrido un error. No es posible eliminar la entidad.");
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
