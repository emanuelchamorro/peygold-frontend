import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import {environment} from '../../../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-pey-verify-security-code',
  templateUrl: './pey-verify-security-code.component.html',
  styleUrls: ['./pey-verify-security-code.component.scss']
})
export class PeyVerifySecurityCodeComponent  extends BaseComponent implements OnInit {

  public user: User;
  public step: number;
  public environment = environment;

  private title:string;
  private message:string;
  private showImageBottom:boolean;
  private sendType:number;
  private routeTo: string;
  private buttonLabel:string;

  constructor(private authService: AuthService,
    ) { 
      super();
    }

  ngOnInit() {

    this.user = this.authService.getUserTemp();
    this.title = "Autenticación en dos pasos";
    this.sendType = 0; //0:email 1:sms
    this.message = "Introduce el código de autenticación único de seis digitos que se envió a tu email";
    this.step = 1;
  }

  continue(resp:any){
    if(resp.result){
      this.authService.addDevice(this.user.email,resp.code).then(
        (resp)=>{
          this.title = "¡PIN Correcto!";
          this.message = "Tu cuenta ha sido autenticada. Ya puedes iniciar sesión ";
          this.showImageBottom = false;
          this.buttonLabel = "Iniciar sesión";
          this.routeTo = this.routes.login.href;
          this.step++;
        }
      ).catch(
        (error)=>{
          this.setError('Código de seguridad inválido.');
      });

    }
  }

}
