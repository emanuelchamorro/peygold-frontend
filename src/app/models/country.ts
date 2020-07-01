import { SelectOption } from './select-option';

/**
 * Country model
 */
export class Country extends SelectOption {

    public numericPrefix:string;
    public idCountryAndPrefix:string;

    constructor(
        value?: string,
        public label?: string,
        numericPrefix?:string,
        idCountryAndPrefix?:string

      ) {
        super(value,label);
        this.numericPrefix = numericPrefix;
        this.idCountryAndPrefix = idCountryAndPrefix;
      }
}
