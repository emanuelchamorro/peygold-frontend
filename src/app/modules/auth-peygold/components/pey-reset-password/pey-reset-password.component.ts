import {Component, OnInit} from '@angular/core';
import {User} from '../../../../models';
import {environment} from '../../../../../environments/environment';
import {BaseComponent} from '../../components/base.component';
import {NgModel} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pey-reset-password',
  templateUrl: './pey-reset-password.component.html',
  styleUrls: ['./pey-reset-password.component.scss']
})
export class PeyResetPasswordComponent extends BaseComponent implements OnInit {

  private user: User;
  private step: number;
  private environment = environment;
  private tryNextStep = false;

  constructor(
    private authService: AuthService,
    private router: Router,
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
   * Retrieve the token for the user email.
   */
  retrieveEmailToken(validators: Array<NgModel>) {
    const valid = this.validateModels(validators);

    if (!valid) {
      return;
    }

    this.authService.retrieveResetPasswordTokenByEmail(this.user.email).then((response) => {
      this.nextStep();
    }).catch(() => {
      this.addError('El correo eléctronico no se encuentra registrado en nuestra plataforma');
    });
  }

  /**
   * Check the token
   */
  validateToken(validators: Array<NgModel>) {
    const valid = this.validateModels(validators);

    if (!valid) {
      return;
    }

    this.authService.validateResetPasswordToken(this.user.email, this.user.token).then((response) => {
      this.nextStep();
    }).catch(() => {
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

    this.authService.resetUserPassword(this.user.email, this.user.token, this.user.password).then((response) => {
      this.user = null;
      this.router.navigateByUrl(this.url(this.routes.reset_password.success), {
        state : {
          securedRedirection: true
        }
      });
    }).catch(() => {
      this.addError('Ha ocurrido un error al cambiar la contraseña');
    });
  }
}
