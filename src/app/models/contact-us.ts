import {Model} from './model';
import {DocumentType} from './document-type';
import { User } from './user';
import { SelectOption } from './select-option';

/**
 * ContactUs model
 */
export class ContactUs extends Model {
  userSender:User;
  bodyMessage: string;
  subject: SelectOption;
}
