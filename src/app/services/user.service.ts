import { Injectable } from '@angular/core';
import {User} from '../models';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  /**
   * Get the user by a keyword. Filtered by the user name or user email
   */
  search(keyword: string): Promise<Array<User>> {
    return this.get(`/users/search/${keyword}`)
      .pipe(
        map((users: Array<any>) => users.map(
          (user) => this.castUser(user))
        )
      )
      .toPromise().catch(() => []);
  }

  /**
   * Cast the user response to a User model.
   * @param user from the response
   */
  private castUser(user): User {
    const mUser = new User();
    mUser.id = user.idUser;
    mUser.idAspNetUser = user.idAspNetUser;
    mUser.name = user.firstName;
    mUser.lastName = user.lastName;
    mUser.email = user.email;
    mUser.phone = user.phone;
    mUser.avatarURL = environment.api.avatarUrl + user.avatarURL;
    mUser.dateRegistered = user.dateRegistered;
    mUser.fullName = user.fullName;
    mUser.idUserType = user.idUserType;
    return mUser;
  }
}
