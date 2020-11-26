import {Injectable} from '@angular/core';
import {AuthService} from '../../auth-peygold/services/auth.service';
import {CanActivate} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService implements CanActivate {

  constructor(public auth: AuthService) {}

  /**
   * Can activate an SC user.
   * @return boolean true if can activate the action.
   */
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      var auth = localStorage.getItem('auth');
      localStorage.clear();
      localStorage.setItem('auth',auth);
      localStorage.clear();
    }
    return true;
  }
}
