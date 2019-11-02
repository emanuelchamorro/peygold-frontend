import {Component, Input, OnInit} from '@angular/core';
import {User, UserStatus} from '../../../../models';
import {UsersService} from '../../services/users.service';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-sc-pey-dashboard',
  templateUrl: './sc-pey-dashboard.component.html',
  styleUrls: ['./sc-pey-dashboard.component.scss']
})
export class ScPeyDashboardComponent extends BaseComponent implements OnInit {

  private users: Array<User>;

  /**
   * ScPeyDashboardComponent
   */
  constructor(
    private usersService: UsersService,
  ) {
    super();
    this.users = [];
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.usersService.all().then((users: Array<User>) => {
      console.log(users);
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
   * Show the user detail
   * @param user The user to show
   * @return void
   */
  showUser(user: User): void {

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
