import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Address, City, Contact, Country, ProfitInstitution, State, User, UserStatus, DocumentType, Person} from '../../../models';
import {HttpClient} from '@angular/common/http';
import {InMemoryService} from '../../../services';
import {UserService} from '../../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends UserService {

  constructor(
    protected http: HttpClient,
    protected inMemoryService: InMemoryService,
  ) {
    super(http, inMemoryService);
  }

  /**
   * Get all users.
   * @param words filter word key
   * @param words filter by user status
   */
  all(words?: string, status?: UserStatus): Promise<Array<User>> {
    let resourceUrl = '/users';

    if (words) {
      resourceUrl = '/users/search/' + words;
    }

    return this.get(resourceUrl)
      .toPromise().then((users: Array<User>) => users.map((user: any) => {
        const nUser = new User();
        nUser.id = user.idUser;
        nUser.idAspNetUser = user.idAspNetUser;
        nUser.avatarURL = user.avatarURL;
        nUser.dateRegistered = user.dateRegistered;
        nUser.name = user.firstName;
        nUser.lastName = user.lastName;
        nUser.fullName = user.fullName;
        nUser.phone = user.phone;
        nUser.email = user.email;
        nUser.idUserType = user.idUserType;
        return nUser;
      })
    );
  }

  /**
   * Create a new user.
   * @param user The new user
   */
  store(user: User): Promise<boolean> {
    console.log(user);

    return this.post('/users', user).toPromise();
  }

  /**
   * Edit the user.
   * @param user The user to edit
   */
  update(user: User): Promise<boolean> {
    console.log(user);

    return this.put('/users', user).toPromise();
  }


}
