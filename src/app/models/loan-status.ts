import { SelectOption } from './select-option';
import {LoanStatusEnum} from '../enums';


/**
 * LoanStatus model
 */
export class LoanStatus extends SelectOption {

  public imgIcon:string

  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case LoanStatusEnum.Approved:
        this.label = 'Aprobada';
        this.imgIcon = "assets/images/tildes-17.png"
        break;
      case LoanStatusEnum.Pending:
        this.label = 'Pendiente';
        this.imgIcon = "assets/images/wrong.png"
        break;
      case LoanStatusEnum.Denied:
        this.label = 'Denegada';
        this.imgIcon = "assets/images/error-rojo.svg"
        break;
    }
  }
}
