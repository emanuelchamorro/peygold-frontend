import { SelectOption } from './select-option';
import {TransactionTypeEnum} from '../enums';

/**
 * TransactionType model
 */
export class TransactionType extends SelectOption {

  public coin: string;
  public minAmount: number;

  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case TransactionTypeEnum.Fiat:
        this.coin  = '$';
        this.label = 'Pesos';
        this.minAmount = 1000;
        break;
      case TransactionTypeEnum.Points:
        this.coin  = 'P$G';
        this.label = 'Puntos';
        this.minAmount = 1000;
        break;
      case TransactionTypeEnum.CreditPoints:
        this.coin  = 'PC$G';
        this.label = 'Credit Points';
        this.minAmount = 1000;
        break;
    }
  }

  /**
   * Return is MultiPey
   */
  get isMultiPey(): boolean {
    return this.value === TransactionTypeEnum.MultyPey;
  }
}
