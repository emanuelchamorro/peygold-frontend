import {Model} from './model';
import {Currency} from './currency';

/**
 * Balance model
 */

export class Balance extends Model {

  static TYPE_FIAT      = 'Pesos';
  static TYPE_CREDIT    = 'CreditPoints';

  public currency: Currency;

  /**
   * Balance model
   * @param amount The amount value.
   * @param pendingAmount The pending amount value.
   */
  constructor(
    public amount = 0,
    public pendingAmount = 0
  ) {
    super();
  }

  /**
   * Set the currency name
   * @param currencyName currency name
   */
  set currencyName(currencyName: string) {
    if (! this.currency) {
      this.currency = new Currency();
    }

    this.currency.label = currencyName;
  }

  /**
   * return true is the balance is a credit balance
   * @return boolean
   */
  get isCredit(): boolean {
    return this.currency && this.currency.label === Balance.TYPE_CREDIT;
  }

  /**
   * return true is the balance is a fiat balance
   * @return boolean
   */
  get isFiat(): boolean {
    return this.currency && this.currency.label === Balance.TYPE_FIAT;
  }

  /**
   * Return the currency type of the balance.
   * @return string
   */
  get currencyType(): string {
    if (this.isCredit) {
      return 'P$G';
    }
    if (this.isFiat) {
      return '$';
    }

    return '';
  }
}
