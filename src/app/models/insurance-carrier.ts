import { State } from './state';
import { Country } from './country';
import { City } from './city';
import { Status } from './status';
import { User } from './user';
import { Address } from './address';
import { Bank } from './bank';
import { Model } from './model';

export class InsuranceCarrier extends Model {
    id:number;
    socialReason: string;
    cuit: string;
    contactUser:User;
    address: Address;
    bank: Bank;
    cbu: string;
    currentAccount: string;
    deleted: boolean;
    status : Status;
    
    
    
    constructor(){
      super();
      this.address = new Address();
      this.contactUser = new User();
      this.bank = new Bank();   
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
