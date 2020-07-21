import { SelectOption } from './select-option';

/**
 * VerifyStatus model
 */
export class VerifyStatus extends SelectOption {
  public verified:boolean;
  public imgIcon:string

  constructor(
    verified?:boolean,
    value?: string,
    public label?: string,
  ) {
    super(value);
    this.verified = verified;
    if(this.verified){
      this.label = 'Verificado';
      this.imgIcon = "assets/images/confirmacion-verde.svg"
    }else{
      this.label = 'Pendiente';
      this.imgIcon = "assets/images/pendiente.svg"
    }
  }
}
