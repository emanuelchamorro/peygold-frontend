import {Component, OnInit, Output} from '@angular/core';
import {User} from '../../../../models';
import {environment} from '../../../../../environments/environment';
import {BaseComponent} from '../../components/base.component';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pey-reset-password',
  templateUrl: './pey-reset-password.component.html',
  styleUrls: ['./pey-reset-password.component.scss']
})
export class PeyResetPasswordComponent extends BaseComponent implements OnInit {


   
  private user: User;
  private title:string;
  private message:string;
  private sendType:number = 0;
  private step: number;
  private environment = environment;
  private tryNextStep = false;
 

  constructor(
    private authService: AuthService,
    protected router: Router,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.user = new User();
    this.step = 1;
  }

  /**
   * Go to next step
   * @return void
   */
  nextStep(): void{
    this.cleanErrors();
    this.tryNextStep = false;
    this.step++;
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



    /**
   * Check the email
   */
  checkEmail(validators: Array<NgModel>){
    const valid = this.validateModels(validators);
    if (!valid) {
      return;
    }
    this.spinnerService.show();
    this.authService.checkEmail(this.user.email).then((response) => {
      this.spinnerService.hide();
      if(response.exists){
        this.user.phone = "xxxxxxxxx"
        this.nextStep();
      }else{
        this.addError('El correo eléctronico no se encuentra registrado en nuestra plataforma');
      }
    }).catch(() => {
      this.spinnerService.hide();
      this.addError('El correo eléctronico no se encuentra registrado en nuestra plataforma');
    });
  }

    /**
   * Retrieve the token for the user email.
   */
  sendToken() {
    this.spinnerService.show();
    console.log('sendTokenType', this.sendType);
    this.authService.sendToken(this.user.email,this.sendType).then((response) => {
      this.spinnerService.hide();
      this.title = "¡Codigo de seguridad enviado!";
      if(this.sendType == 0){
        this.message = "Te hemos enviado un correo electrónico con un código de seguridad, revisa tu casilla de mensajes. Puede que demore unos minutos en llegarte.";
      }else{
        this.message = "Te hemos enviado un sms con un código de seguridad, revisa tu casilla de mensajes. Puede que demore unos minutos en llegarte.";
      }
      
      this.nextStep();
    }).catch((error) => {
      this.spinnerService.hide();
      console.log(error);
      this.setError(error.message);
    });
  }

  continue(resp:any){
    if(resp.result){
      this.nextStep();
    }
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
      this.nextStep();
    }).catch(() => {
      this.spinnerService.hide();
      this.addError('El código de seguridad es incorrecto');
    });
  }

  /**
   * Change the user password
   */
  changePassword(validators: Array<NgModel>) {
    const valid = this.validateModels(validators);

    if (!valid) {
      return;
    }
    this.spinnerService.show();
    this.authService.resetUserPassword(this.user.email, this.user.token, this.user.password).then((response) => {
      this.user = null;
      this.spinnerService.hide();
      this.router.navigateByUrl(this.routes.reset_password.success.href, {
        state : {
          securedRedirection: true
        }
      });
    }).catch(() => {
      this.spinnerService.hide();
      this.addError('Ha ocurrido un error al cambiar la contraseña');
    });
  }


  
}
