import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models';
import {BaseComponent} from '../base-component.component';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-ui-pey-user-autocomplete',
  templateUrl: './ui-pey-user-autocomplete.component.html',
  styleUrls: ['./ui-pey-user-autocomplete.component.scss']
})
export class UIPeyUserAutocompleteComponent extends BaseComponent implements OnInit {

  @Output() selectUser: EventEmitter<User> = new EventEmitter<User>();

  private users: Array<User>;

  @Input()
  private user: User;

  @Input()
  private filterUsers: Array<number>;

  /**
   * UIPeyUserAutocompleteComponent
   */
  constructor(
    private userService: UserService
  ) {
    super();
  }

  /**
   * On Init implementation
   */
  ngOnInit() {

  }

  /**
   * Search the users by the email or name.
   * @param keyword email or name keyword
   */
  searchUsers(keyword: string) {
    if (keyword && keyword.length > 3) {
      setTimeout(() => {
        this.userService.search(keyword).then((users: Array<User>) => {
          if (this.filterUsers) {
            users = users.filter((user) => !this.filterUsers.includes(user.id) && user.active) ;
          }
          this.users = users;
        });
      }, 300);
    }
  }

  /**
   * Select the user and set it to the trasaction object
   * @param keyword email or name keyword
   */
  emitUser(user: User) {
    this.selectUser.emit(user);
    this.users = new Array<User>();
  }

  /**
   * Clear the user and emit to the parent componente
   */
  clearUser() {
    this.selectUser.emit(null);
  }
}
