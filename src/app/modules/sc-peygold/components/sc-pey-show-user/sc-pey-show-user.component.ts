import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../models';
import {UsersService} from '../../services/users.service';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sc-pey-show-user',
  templateUrl: './sc-pey-show-user.component.html',
  styleUrls: ['./sc-pey-show-user.component.scss']
})
export class ScPeyShowUserComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() id: number;

  constructor(
    private usersService: UsersService
  ) {}

  /**
   * On init implementation
   */
  ngOnInit() {
    if (this.user) {
      return;
    }

    if (this.id) {
      this.getUser(this.id);
      return;
    }
  }

  /**
   * On destroy implementation
   */
  ngOnDestroy() {}

  /**
   * Get the user info by the id.
   * @param id User id
   */
  private getUser(id: number): void {
    this.usersService.one(id).then((user: User) => {
      this.user = user;
    });
  }
}
