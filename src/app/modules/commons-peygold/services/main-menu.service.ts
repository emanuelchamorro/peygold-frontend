import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {MenuItem} from '../entities/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {

  private items = new Subject<Array<MenuItem>>();
  public $items = this.items.asObservable();

  constructor() { }

  /**
   * Initialize and add the items to the menu service.
   * @param items List of items.
   */
  setItems(items: Array<MenuItem>) {
    this.items.next(items);
  }
}
