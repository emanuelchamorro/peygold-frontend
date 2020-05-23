import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { PaginationResponse } from '../../../../modules/commons-peygold/entities/pagination-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { Retention } from '../../../../models/retention';
import { ReportsService } from '../../services/reports.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sc-pey-report-retention-detail',
  templateUrl: './sc-pey-report-retention-detail.component.html',
  styleUrls: ['./sc-pey-report-retention-detail.component.scss']
})
export class ScPeyReportRetentionDetailComponent extends BaseComponent implements OnInit {

  private retentions: Array<Retention>;
  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;
  private exportAsConfig: ExportAsConfig;
  public monthArray = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  public year:number;
  public monthNumber:number;


  constructor(private spinnerService: NgxSpinnerService,
              private exportAsService: ExportAsService,
              private reportsService:ReportsService,
              private route: ActivatedRoute) {
    super();
    this.monthNumber = Number(this.route.snapshot.paramMap.get('month'))
    this.year =  Number(this.route.snapshot.paramMap.get('year'));
  }

  ngOnInit() {
    this.spinnerService.show();

     this.reportsService.loadDetail(this.monthNumber, this.year).then((response: Array<Retention>) => {
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
         this.setError("Ha ocurrido un error. No es posible cargar el detalle de retenciones.");
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
      elementId: 'tableDetails', // the id of html/table element
    }
    this.exportAsService.save(this.exportAsConfig, 'Detalles_retenciones').subscribe(
      () => { },// save started
      (error) => {
        this.setError("Ha ocurrido un error. No es posible exportar el reporte en el formato seleccionado.");
      }
    );
  }

  public get month():string {
    return this.monthArray[this.monthNumber -1];
  }

}
