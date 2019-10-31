import { Component, OnInit } from '@angular/core';
import {User, UserStatus} from '../../../../models';
import {UsersService} from '../../services/users.service';
import {ErrorResponse} from '../../../commons-peygold/services/error-response';

@Component({
  selector: 'app-sc-pey-users',
  templateUrl: './sc-pey-users.component.html',
  styleUrls: ['./sc-pey-users.component.scss']
})
export class ScPeyUsersComponent implements OnInit {

  private users: Array<User>;

  private detailedUser: User;

  /**
   * ScPeyDashboardComponent
   */
  constructor(
    private usersService: UsersService,
  ) {
    this.users = [];
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.usersService.all().then((users: Array<User>) => {
      this.users = users;
    });
  }

  /**
   * Export the data to document.
   * @param type Exporting type
   * @return void
   */
  export(type: string): void {
    console.log(type);
  }

  /**
   * Go to new user view.
   * @return void;
   */
  createUser(): void {

  }

  /**
   * Show the user detail
   * @param user The user to show
   * @return void
   */
  showUser(user: User): void {
    if (user.id) {
      this.usersService.one(user.id).then((detailedUser: User) => {
          this.detailedUser = detailedUser;
      });
    }
  }

  /**
   * Redirect to edit route;
   * @param user User to be edited.
   * @return void
   */
  editUser(user: User): void {

  }

  /**
   * Activate the user
   * @param user The user to be activated.
   * @return void
   */
  activateUser(user: User): void {

  }

  /**
   * Deactivate the user
   * @param user The user to be deactivated.
   * @return void
   */
  deactivateUser(user: User): void {

  }

  /**
   * Block the user
   * @param user The user to be blocked.
   * @return void
   */
  blockUser(user: User): void {

  }

  /**
   * Unblock the user
   * @param user The user to be unblocked.
   * @return void
   */
  unblockUser(user: User): void {

  }

  /**
   * Filter the user list by
   * @param filter filter value
   * @return void
   */
  filterUsers(filter: string): void {

  }

  /**
   * Filter the user list by the selected User Status model.
   * @param userStatus the selected user status.
   * @return void
   */
  filterByStatus(userStatus: UserStatus): void {

  }
}
