import {MenuItem} from './menu-item';

/**
 * MenuSeparator entity
 */
export class MenuSeparator extends MenuItem {

  /**
   * MenuSeparator entity
   */
  constructor() {
    super();
    this.isSeparator = true;
  }
}
