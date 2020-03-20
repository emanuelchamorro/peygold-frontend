import { SelectOption } from './select-option';
import {Address} from './address';
import { User } from './user';

/**
 * Bank model
 */
export class Bank extends SelectOption {

  public idBank:number;
  public socialReason: string;
  public cuit: string;
  public contactUser:User;
  public address: Address;
  public phone: string;
  public deleted:boolean;


  constructor(value?: string,
    public label?: string){
    super();
    this.value = String(value);
    this.address = new Address();
    this.contactUser = new User();
  }


    /**
   * Get the insurance carrier initials name
   * @return string the initials name
   */
  get initials(): string {
    const completeName = this.socialReason;

    if (!completeName) {
      return '';
    }

    let initials = '';

    completeName.split(' ').map((name) => initials += name.charAt(0));

    return initials;
  }
}
