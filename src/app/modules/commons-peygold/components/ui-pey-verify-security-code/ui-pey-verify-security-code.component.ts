import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base-component.component';
import { NgModel } from '@angular/forms';
import { User } from 'src/app/models';

@Component({
  selector: 'app-ui-pey-verify-security-code',
  templateUrl: './ui-pey-verify-security-code.component.html',
  styleUrls: ['./ui-pey-verify-security-code.component.scss']
})
export class UiPeyVerifySecurityCodeComponent extends BaseComponent implements OnInit {

  @Input('user')  public user: User;
  @Input('title')  public title:string;
  @Input('message')  public message:string;
  @Input('sendType') public sendType:number;
  @Output()
  public onContinue: EventEmitter<any> = new EventEmitter<any>();

  private tryNextStep = false;


  constructor(    private authService: AuthService,
    private spinnerService:NgxSpinnerService) { 
      super();
    }

  ngOnInit() {
  }

  

    /**
   * Check the token
   */
  validateToken(validators: Array<NgModel>) {
    const valid = this.validateModels(validators);

    if (!valid) {
      return;
    }
    this.spinnerService.show();
    this.authService.validateResetPasswordToken(this.user.email, this.user.token).then((response) => {
      this.spinnerService.hide();
      this.onContinue.emit({result:true, code:this.user.token});
    }).catch(() => {
      this.spinnerService.hide();
      this.setError('Código inválido. Vuelve a intentarlo');      
    });
  }

  /**
   * Validate the form models
   */
  validateModels(validators: Array<NgModel>) : boolean{
    const valid = this.isValidFormModels(validators);

    if (! valid) {
      this.tryNextStep = true;
    }

    return valid;
  }

  sendToken(): void{
    this.spinnerService.show();
    this.user.token = '';
    this.authService.sendToken(this.user.email,this.sendType).then((resp)=>{
      this.spinnerService.hide();
      if(!resp.success){
        this.setError('Ha ocurrido un error enviando código de seguridad.');
      }
    });
  }

}
