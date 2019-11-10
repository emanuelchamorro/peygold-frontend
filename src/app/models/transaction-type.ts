import { SelectOption } from './select-option';
import {TransactionTypeEnum} from '../enums';

/**
 * TransactionType model
 */
export class TransactionType extends SelectOption {

  public coin: string;

  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case TransactionTypeEnum.Fiat:
        this.coin  = 'transaction.type.fiat.coin';
        this.label = 'transaction.type.fiat.coin.label';
        break;
      case TransactionTypeEnum.Points:
        this.coin  = 'transaction.type.points.coin';
        this.label = 'transaction.type.points.coin.label';
        break;
      case TransactionTypeEnum.CreditPoints:
        this.coin  = 'transaction.type.credit_points.coin';
        this.label = 'transaction.type.credit_points.coin.label';
        break;
    }
  }
}
