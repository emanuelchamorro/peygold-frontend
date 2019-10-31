import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models';
import {BaseComponent} from '../../../commons-peygold/components/base-component.component';
import {AuthService} from '../../services/auth.service';
import {ErrorResponse} from '../../../commons-peygold/services/error-response';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

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
    private router: Router,
  ) {
    super();
  }

  private user: User = new User();

  /**
   * On init implementation
   */
  ngOnInit() {

  }

  /**
   * Do login
   */
  login(): void {
    this.authService.login(this.user.email, this.user.password).then((user: User) => {
      localStorage.setItem(environment.localStorage.user_var_name, user.toString());
      localStorage.setItem(environment.localStorage.access_token_var_name, user.token);
      this.router.navigateByUrl(environment.sc.home, {
        state : {
          securedRedirection: true
        }
      });
    }).catch((e: ErrorResponse) => {
      this.addError(e.message).waitAndCleanErrors();
    });
  }

}
