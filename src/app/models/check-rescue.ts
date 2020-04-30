import { SelectOption } from './select-option';

/**
 * Check Rescue model
 */
export class CheckRescue extends SelectOption {

  public idCheckRescue:number;
  public  deleted:boolean;

   constructor(
        value?: string,
        public label?: string,
        deleted?:boolean
      ) {
        super();
        this.deleted = deleted;
      }
}
