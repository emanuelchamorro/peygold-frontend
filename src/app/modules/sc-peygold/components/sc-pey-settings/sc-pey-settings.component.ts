import { Component, OnInit } from '@angular/core';
import { PeySetting } from '../../../../models/pey-setting';
import { BaseComponent } from '../base.component';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { PeySettingService } from '../../services/pey-setting.service'; 
import { PeySettingFactory } from '../../../../factory/pey-setting-factory'


@Component({
  selector: 'app-sc-pey-settings',
  templateUrl: './sc-pey-settings.component.html',
  styleUrls: ['./sc-pey-settings.component.scss']
})
export class ScPeySettingsComponent extends BaseComponent implements OnInit {

  public peySetting: PeySetting;

  constructor(private spinnerService: NgxSpinnerService,
              private peySettingService: PeySettingService) {
    super();
   }

  ngOnInit() {
    this.peySetting = new PeySetting();
    this.spinnerService.show();
    this.peySettingService.getSetting().then(
      (resp:PeySetting)=>{
        this.spinnerService.hide();
        if(resp){
          this.peySetting = resp;
        }else{
          this.setError("Ha ocurrido un error. No es posible mostrar la configuracón del sistema.");
        }
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError("Ha ocurrido un error. No es posible mostrar la configuracón del sistema.");
      }
    );

  }

  onSubmit(){

   this.spinnerService.show();
   console.log('setting', PeySettingFactory.make(this.peySetting))
    this.peySettingService.update(PeySettingFactory.make(this.peySetting)).then(
      (resp) => {
        this.spinnerService.hide();
        this.setSuccess('La configuracón del sistema fué actualizada.');
      }
    ).catch(
      (error) => {
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No es posible actualizar la configuración del sistema.');
      }
    );

  }

}
