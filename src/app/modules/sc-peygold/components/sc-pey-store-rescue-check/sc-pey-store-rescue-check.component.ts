import { Component, OnInit } from '@angular/core';
import { CheckRescue } from '../../../../models/check-rescue';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { RescuecheckService } from '../../services/rescuecheck.service';
import { CheckRescueFactory } from '../../../../factory/checkrescue-factory';

@Component({
  selector: 'app-sc-pey-store-rescue-check',
  templateUrl: './sc-pey-store-rescue-check.component.html',
  styleUrls: ['./sc-pey-store-rescue-check.component.scss']
})
export class ScPeyStoreRescueCheckComponent extends BaseComponent implements OnInit {

  checkRescue: CheckRescue;
  checkRescueId: number;

  constructor(private route: ActivatedRoute,    
    private spinnerService: NgxSpinnerService,
    private rescuecheckService: RescuecheckService) {
      super(); 
      this.checkRescueId = Number( this.route.snapshot.paramMap.get("rescuecheckId"));
    }

  ngOnInit() {

    if(this.checkRescueId && !isNaN(this.checkRescueId)){
      this.getCheckRescue(this.checkRescueId);
      return;
    }

    this.checkRescue = new CheckRescue();
  }


    /**
   * Get the checkRescue info by the id.
   * @param id checkRescue id
   */
  private getCheckRescue(id: number): void {
     this.spinnerService.show();
     this.rescuecheckService.getById(id).then((checkRescue: CheckRescue) => {
       this.checkRescue = checkRescue;
       this.spinnerService.hide();
     }).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle de la opcion de rescate.");
      }
    );
   }


       /**
   * Store the checkRescue data
   * @param checkRescue option to be stored.
   * @return void;
   */
  onSubmit(checkRescue: CheckRescue){

    if(checkRescue.idCheckRescue){
     this.updateCheckRescue(checkRescue);
      return;
    }
      this.createCheckRescue(checkRescue);
  }


    /**
   * Store the checkRescue data
   * @param checkRescue option to be created.
   * @return void;
   */
  private createCheckRescue(checkRescue: CheckRescue): void{
   this.spinnerService.show();
    this.rescuecheckService.store(CheckRescueFactory.make(checkRescue)).then((resp: CheckRescue)  => {
      this.spinnerService.hide();
      this.setSuccess('La opción de rescate fué creada con exito.');
    }).catch((error) => {      
      this.spinnerService.hide();
      this.setError('La opción de rescate no pudo ser creada.');
    });
  }

    /**
   * Store the checkRescue data
   * @param checkRescue option to be created.
   * @return void;
   */
  private updateCheckRescue(checkRescue: CheckRescue): void{
    this.spinnerService.show();
    this.rescuecheckService.update(CheckRescueFactory.make(checkRescue)).then((resp: CheckRescue)  => {
      this.spinnerService.hide();
      this.setSuccess("La opción de rescate fué actualizada con exito.");
    }).catch((error) => {
      this.spinnerService.hide();
      this.setError("La opción de rescate no pudo ser actualizada.");
    });
  }

}
