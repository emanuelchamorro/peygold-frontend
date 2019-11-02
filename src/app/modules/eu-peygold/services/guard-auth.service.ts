import {Injectable} from '@angular/core';
import {AuthService} from '../../auth-peygold/services/auth.service';
import {CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  constructor(public auth: AuthService) {}

  /**
   * Can activate an SC user.
   * @return boolean true if can activate the action.
   */
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      return false;
    }
    return true;
  }
}
