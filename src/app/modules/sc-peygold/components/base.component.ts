import {BaseComponent as AppBaseComponent} from '../../commons-peygold/components/base-component.component';
import {routes} from '../routes';

export class BaseComponent extends AppBaseComponent {
  protected routes = routes;

  /**
   * Add sc context to the url
   * @param path The url.
   */
  protected url(path): string{
    return '/' + routes.home + '/' + path;
  }
}
