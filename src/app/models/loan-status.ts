import { SelectOption } from './select-option';
import {LoanStatusEnum} from '../enums';


/**
 * LoanStatus model
 */
export class LoanStatus extends SelectOption {

  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case LoanStatusEnum.Approved:
        this.label = 'Aprobada';
        break;
      case LoanStatusEnum.Pending:
        this.label = 'Pendiente';
        break;
      case LoanStatusEnum.Denied:
        this.label = 'Denegada';
        break;
    }
  }
}
