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
        this.label = this.label?this.label:'Pesos';
        this.minAmount = 100;
        break;
      case TransactionTypeEnum.Points:
        this.coin  = 'P$G';
        this.label = this.label?this.label:'Puntos';
        this.minAmount = 100;
        break;
      case TransactionTypeEnum.CreditPoints:
        this.coin  = 'P$C';
        this.label = this.label?this.label:'Credit Points';
        this.minAmount = 100;
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
