import { Component, OnInit } from '@angular/core';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { BaseComponent } from '../base.component';
import { Retention } from '../../../../models/retention';
import { ReportsService } from '../../services/reports.service';
import { InMemoryService } from '../../../../services/in-memory.service';
import { SelectOption } from '../../../../models/select-option';

@Component({
  selector: 'app-sc-pey-report-retentions',
  templateUrl: './sc-pey-report-retentions.component.html',
  styleUrls: ['./sc-pey-report-retentions.component.scss']
})
export class ScPeyReportRetentionsComponent extends BaseComponent implements OnInit {


  private retentions: Array<Retention>;
  private detailedRetention: Retention;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  public filter: string;
  private exportAsConfig: ExportAsConfig;
  private years:Array<SelectOption>;
  private year:any;

  constructor(private spinnerService: NgxSpinnerService,
    private exportAsService: ExportAsService,
    private reportsService:ReportsService,
    private inMemoryService:InMemoryService) {
    super();
  }

  ngOnInit() {
     this.spinnerService.show();
     this.years = this.inMemoryService.loadYears;
     console.log('years',this.years);
     const currentDate = new Date();
     this.year = currentDate.getFullYear()
      this.reportsService.searchRetentions(currentDate.getFullYear()).then((response: Array<Retention>) => {
        this.retentions = response;
        if (this.retentions && this.retentions.length > 0) {
          this.showPagination = true;

        }else{
          this.showPagination = false;
        }   
        this.spinnerService.hide();
      }).catch(
        (erro) => {
          this.showPagination = false;
          this.spinnerService.hide();
          this.setError("Ha ocurrido un error. No es posible cargar las retenciones.");
        }
      );
  }

  loadPage(year: number) {
    this.reportsService.searchRetentions(year).then((response: Array<Retention>) => {
      this.retentions = response;
      if (this.retentions && this.retentions.length > 0 ) {
        this.showPagination = true;
      }else{
        this.showPagination = false;
      }   
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.showPagination = false;
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible cargar las retenciones.");
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
      elementIdOrContent: 'tableRetentions', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Retenciones').subscribe(
      () => { },// save started
      (error) => {
        this.setError("Ha ocurrido un error. No es posible exportar el reporte en el formato seleccionado.");
      }
    );
  }


  setFilter(year:string){
    this.year = year;
    this.loadPage(Number(year));
  }
}
