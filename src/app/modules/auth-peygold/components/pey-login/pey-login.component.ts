import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models';
import {BaseComponent} from '../../../commons-peygold/components/base-component.component';
import {AuthService} from '../../services/auth.service';
import {ErrorResponse} from '../../../commons-peygold/services/error-response';
import {ApiResponse} from '../../../../services/api-response';

@Component({
  selector: 'app-pey-login',
  templateUrl: './pey-login.component.html',
  styleUrls: ['./pey-login.component.scss']
})
export class PeyLoginComponent extends BaseComponent implements OnInit {

  /**
   * PeyLoginComponent
   * @param authService Provider
   */
  constructor(
    private authService: AuthService,
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
      console.log(user);
    }).catch((e: ErrorResponse) => {
      this.addError(e.message).waitAndCleanErrors();
    });
  }

}
