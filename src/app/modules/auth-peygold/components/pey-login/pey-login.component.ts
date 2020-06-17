import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models';
import {BaseComponent} from '../../components/base.component';
import {AuthService} from '../../services/auth.service';
import {ErrorResponse} from '../../../commons-peygold/entities/error-response';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {routes as scRoutes} from '../../../sc-peygold/routes';
import {routes as euRoutes} from '../../../eu-peygold/routes';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-pey-login',
  templateUrl: './pey-login.component.html',
  styleUrls: ['./pey-login.component.scss']
})
export class PeyLoginComponent extends BaseComponent implements OnInit {
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

  private user: User = new User();

  /**
   * On init implementation
   */
  ngOnInit() {
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
      this.spinnerService.hide();
      if(user){
        localStorage.setItem("hsu",btoa(JSON.stringify(userAccount)));
        this.unbusy();
        this.goToDashboard(user);
      }else{
        console.log('redirect')
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
}
