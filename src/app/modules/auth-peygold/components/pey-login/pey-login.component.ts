import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {User} from '../../../../models';
import {BaseComponent} from '../../components/base.component';
import {AuthService} from '../../services/auth.service';
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {routes as scRoutes} from '../../../sc-peygold/routes';
import {routes as euRoutes} from '../../../eu-peygold/routes';
import {routes as authRoutes} from '../../routes';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pey-login',
  templateUrl: './pey-login.component.html',
  styleUrls: ['./pey-login.component.scss']
})
export class PeyLoginComponent extends BaseComponent implements OnInit {

  @ViewChild('inputPass',{static:false, read: ElementRef }) private inputPass: ElementRef;
  /**
   * PeyLoginComponent
   * @param authService Provider
   * @param router Provider
   */
  constructor(
    private authService: AuthService,
    protected router: Router,
    private spinnerService:NgxSpinnerService
  ) {
    super();
  }
  public visible:boolean;
  private user: User = new User();

  /**
   * On init implementation
   */
  ngOnInit() {
    this.visible=true;
    const serializedUser = localStorage.getItem(environment.localStorage.user_var_name);
    if (serializedUser) {
      const user: User = new User().fromString(serializedUser);
      this.goToDashboard(user);
    }
  }

  /**
   * Do login
   * @return void
   */
  login(): void {
    this.spinnerService.show();
    this.busy();
    const userAccount = this._userAccountMapper(this.user);
    this.authService.login(this.user.email, this.user.password, this.user.rememberMe).then((user: User) => {
      
      if(user){
        this.spinnerService.hide();
        localStorage.setItem("hsu",btoa(JSON.stringify(userAccount)));
        this.unbusy();
        this.goToDashboard(user);
      }else{
        this.spinnerService.hide();
        this.authService.sendToken(this.user.email,0).then((resp)=>{
          if(resp.success){
            this.goTo(authRoutes.verify_security_code.index.route);
          }else{
            this.setError('Ha ocurrido un error enviando código de seguridad. No es posible completar la autenticación de 2 pasos.');
          }
        });
      }
    }).catch((e) => {
      this.spinnerService.hide();
      //const errorThrown = new Error(JSON.parse(e.message));
      console.log('e',e)
      this.catchError(e);

    });
  }

  /**
   * Redirect the authenticated user to the dashboard
   * @param user the authenticated user
   * @return void
   */
  private goToDashboard(user: User): void {
    const dashboardUrl = user.isAdmin ?  scRoutes.dashboard.index.href : euRoutes.home.href;
    //const dashboardUrl = euRoutes.home.href;
    this.home = dashboardUrl;
    this.context = euRoutes.context;
    this.router.navigateByUrl(dashboardUrl, {
      state : {
        securedRedirection: true
      }
    });
  }

  _userAccountMapper(user:User):any{

    let userAccount = {
      email:user.email,
      password:user.password,
      rememberMe:user.rememberMe
    }
    return userAccount;
  }

  showPass(){
    let inputPassElem:HTMLElement = this.inputPass.nativeElement;
    if(inputPassElem.getAttribute('type')==='password'){
      this.visible=false;
      inputPassElem.setAttribute('type','text');
    }else{
      this.visible=true;
      inputPassElem.setAttribute('type','password');
    }
  }

  goTo(route:string){
    this.router.navigateByUrl(route);
  }
}
