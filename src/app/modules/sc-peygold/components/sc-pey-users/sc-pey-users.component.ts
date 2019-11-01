import { Component, OnInit } from '@angular/core';
import {User, UserStatus} from '../../../../models';
import {UsersService} from '../../services/users.service';
import {Router} from '@angular/router';

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
    private router: Router,
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
   * Go to PeyStoreUserComponent.
   * @return void;
   */
  createUser(): void {

  }

  /**
   * Go to PeyStoreUserComponent.
   * @return void;
   */
  editUser(user): void {
    this.router.navigateByUrl('sc/user', {
      state : {
        userId: user.id
      }
    });
  }

  /**
   * Show the user detail
   * @param user The user to show
   * @return void
   */
  showUser(user: User): void {
    this.detailedUser = user;
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
