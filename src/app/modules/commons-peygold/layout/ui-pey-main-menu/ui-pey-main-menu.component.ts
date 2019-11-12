import {Component, OnDestroy, OnInit} from '@angular/core';
import {MainMenuService} from '../../services/main-menu.service';
import {MenuItem} from '../../entities/menu-item';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {menu as scMenu} from '../../../sc-peygold/menu';
import {menu as euMenu} from '../../../eu-peygold/menu';
import {User} from '../../../../models';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../../components/base-component.component';

/**
 * UIPeyMainMenuComponent
 */
@Component({
  selector: 'app-ui-pey-main-menu',
  templateUrl: './ui-pey-main-menu.component.html',
  styleUrls: ['./ui-pey-main-menu.component.scss']
})
export class UIPeyMainMenuComponent extends BaseComponent implements OnInit, OnDestroy {

  private items = new Array<MenuItem>();
  private $items: Subscription;

  /**
   * UIPeyMainMenuComponent
   * @param authService Provider
   */
  constructor(
    private authService: AuthService,
    private mainMenuService: MainMenuService
  ) {
    super();
    const user: User = this.authService.user();
    // const items: Array<MenuItem> = user.isAdmin ?  scMenu : euMenu;
    const items = euMenu;
    this.mainMenuService.setItems(items);
    this.items = items;
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.$items = this.mainMenuService.$items.subscribe((items) => {
      this.items = items; console.log(items);
    });
  }

  /**
   * On destroy implementation
   */
  ngOnDestroy() {
    if (this.$items) {
      this.$items.unsubscribe();
    }
  }
}
