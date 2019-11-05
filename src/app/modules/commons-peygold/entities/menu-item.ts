import {Model} from '../../../models/model';

/**
 * MenuItem entity
 */
export class MenuItem extends Model {

  public label: string;
  public href: string;
  public childs: Array<MenuItem>;
  public displayed: boolean;
  public isSeparator: boolean;
  public icon: string;

  /**
   * Get the url for the routerlink
   */
  get routerLink(): any {
    if (this.hasChilds) {
      return [];
    }

    return this.href;
  }

  /**
   * Has children
   */
  get hasChilds(): boolean {
    return this.childs !== undefined;
  }
}
