import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Address, City, Contact, Country, ProfitInstitution, State, User, UserStatus, DocumentType, Person } from '../../../models';
import { HttpClient } from '@angular/common/http';
import { InMemoryService } from '../../../services';
import { UserService } from '../../../services/user.service';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';

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
   * Search loans.
   * @return Promise<Array<Transaction>> the list of transaction
   */
  searchAll( word: string, page: number, perPage: number): Promise<PaginationResponse> {
    const paginator = new PaginationResponse(page, perPage);
    return this.get(`/users/search/${word}/${page}/${perPage}`).toPromise().then(
      (response:any)=>{
        paginator.count = response.recordCount;
        paginator.data = response.userDTOs.map((item:any)=>{
          const nUser = new User();
          nUser.id = item.idUser;
          nUser.idAspNetUser = item.idAspNetUser;
          nUser.avatarURL = item.avatarURL;
          nUser.dateRegistered = item.dateRegistered;
          nUser.name = item.firstName;
          nUser.lastName = item.lastName;
          nUser.fullName = item.fullName;
          nUser.phone = item.phone;
          nUser.email = item.email;
          nUser.idUserType = item.idUserType;
          return nUser;
        });

        return paginator
      }
    ).catch(
      ()=>{
        return paginator; 
      }
    )

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

    return this.put(`/users/${user.id}`, user).toPromise();
  }

    /**
   * active and inactive
   * @param id is id of the user
   */
  changeActive(id: number,isActive:boolean): Promise<boolean> {
    const params = {
      IdUser: id,
      Active: isActive,
    }
    return this.put(`/users/${id}`, params).toPromise();
  }


}
