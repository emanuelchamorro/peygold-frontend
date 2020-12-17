import {BaseComponent as AppBaseComponent} from '../../commons-peygold/components/base-component.component';
import {routes} from '../routes';
import { User } from '../../../models/user';

export class BaseComponent extends AppBaseComponent {
  protected routes = routes;

  validateImgUser(event, user:User){
    user.avatarURL = 'https://api.peygold.com/images/user.png';
  }

  validateImg(event, item:any){
    item.image = 'https://api.peygold.com/images/user.png';
  }
}
