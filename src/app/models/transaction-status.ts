import { SelectOption } from './select-option';
import {TransactionStatusEnum} from '../enums';


/**
 * TransactionStatus model
 */
export class TransactionStatus extends SelectOption {

  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case TransactionStatusEnum.Approved:
        this.label = 'Aprobada';
        break;
      case TransactionStatusEnum.Pending:
        this.label = 'Pendiente';
        break;
      case TransactionStatusEnum.Rejected:
        this.label = 'Rechazada';
        break;
    }
  }
}
