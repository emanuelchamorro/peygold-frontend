import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralChargeCredit } from '../../../../models/general-charge-credit';
import { InMemoryService } from '../../../../services/in-memory.service';
import { EffectType } from '../../../../models/effect-type';
import { EffectApplicationType } from '../../../../models/effect-application-type';
import { ChargecreditService } from '../../services/chargecredit.service';
import { ChargeCreditFactory } from '../../../../factory/chargecredit-factory';

@Component({
  selector: 'app-sc-pey-store-general-charge-credit',
  templateUrl: './sc-pey-store-general-charge-credit.component.html',
  styleUrls: ['./sc-pey-store-general-charge-credit.component.scss']
})
export class ScPeyStoreGeneralChargeCreditComponent extends BaseComponent implements OnInit {


  private generalChargeCredit: GeneralChargeCredit;
  private generalChargeCreditId: number;
  private effects: Array<EffectType>;
  private effectApplications: Array<EffectApplicationType>;

  constructor(private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private inMemoryService: InMemoryService,
    private chargecreditService: ChargecreditService) {
    super();

    this.generalChargeCreditId = Number(this.route.snapshot.paramMap.get("generalchargecreditId"));
  }

  ngOnInit() {
    this.effects = this.inMemoryService.loadEffectTypes;
    this.effectApplications = this.inMemoryService.loadEffectAplicationTypes;

    if (this.generalChargeCreditId && !isNaN(this.generalChargeCreditId)) {
      this.getGeneralChargeCredit(this.generalChargeCreditId);
      return;
    }

    this.generalChargeCredit = new GeneralChargeCredit();
  }



  /**
 * Get the generalChargeCredit info by the id.
 * @param id generalChargeCredit id
 */
  private getGeneralChargeCredit(id: number): void {
    this.spinnerService.show();
     this.chargecreditService.getById(id, 1).then((generalChargeCredit: GeneralChargeCredit) => {
       this.generalChargeCredit = generalChargeCredit;
       this.spinnerService.hide();
     }).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible mostrar el detalle del cargo y abono.");
      }
    );
  }

  /**
* Store the bgeneralChargeCreditnk data
* @param generalChargeCredit the generalChargeCredit to be stored.
* @return void;
*/
  onSubmit(generalChargeCredit: GeneralChargeCredit) {

    if (generalChargeCredit.idChargeCredit) {
      this.updateGeneralChargeCredit(generalChargeCredit);
      return;
    }
    this.createGeneralChargeCredit(generalChargeCredit);
  }


  /**
 * Store the generalChargeCredit data
 * @param generalChargeCredit the generalChargeCredit to be created.
 * @return void;
 */
  private createGeneralChargeCredit(generalChargeCredit: GeneralChargeCredit): void {
    this.spinnerService.show();
     this.chargecreditService.store(ChargeCreditFactory.make(generalChargeCredit, 1), 1).then((resp: GeneralChargeCredit)  => {
       this.spinnerService.hide();
       this.setSuccess('El cargo y abono fué creado con exito.');
     }).catch((error) => {      
       this.spinnerService.hide();
       this.setError('El cargo y abono no pudo ser creado.');
     });
  }

  /**
 * Store the generalChargeCredit data
 * @param generalChargeCredit the generalChargeCredit to be created.
 * @return void;
 */
  private updateGeneralChargeCredit(generalChargeCredit: GeneralChargeCredit): void {
     this.spinnerService.show();
     this.chargecreditService.update(ChargeCreditFactory.make(generalChargeCredit, 1), 1).then((resp: GeneralChargeCredit)  => {
       this.spinnerService.hide();
       this.setSuccess('El cargo y abono fué actualizado con exito.');
     }).catch((error) => {
       this.spinnerService.hide();
       this.setError('El cargo y abono no pudo ser actualizado.');
     });
  }

}
