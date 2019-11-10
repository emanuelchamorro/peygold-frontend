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
        this.label = 'transaction.status.approved.label';
        break;
      case TransactionStatusEnum.Pending:
        this.label = 'transaction.status.pending.label';
        break;
      case TransactionStatusEnum.Rejected:
        this.label = 'transaction.status.rejected.label';
        break;
    }
  }
}
