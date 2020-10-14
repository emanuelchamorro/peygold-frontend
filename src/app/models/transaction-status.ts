import { SelectOption } from './select-option';
import { TransactionStatusEnum } from '../enums';


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
        this.label = this.label ? this.label : 'Aprobada';
        break;
      case TransactionStatusEnum.Pending:
        this.label = this.label ? this.label : 'Pendiente';
        break;
      case TransactionStatusEnum.Rejected:
        this.label = this.label ? this.label : 'Rechazada';
        break;
      case TransactionStatusEnum.Cancel:
        this.label = this.label ? this.label : 'Cancelada';
        break;
      case TransactionStatusEnum.Rejected:
        this.label = this.label ? this.label : 'Devuelta';
        break;
      case TransactionStatusEnum.Active:
        this.label = this.label ? this.label : 'Activa';
        break;
      case TransactionStatusEnum.Desactive:
        this.label = this.label ? this.label : 'Desactivada';
        break;
      case TransactionStatusEnum.Finish:
        this.label = this.label ? this.label : 'Finalizada';
        break;
    }
  }
}
