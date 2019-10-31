import {Model} from './model';

/**
 * SelectOption model
 */
export class SelectOption extends Model {

  public value: string;

  /**
   * Used to display data in forms.
   * @param value Select option value
   * @param label Select option value
   */
  constructor(
    value?: string,
    public label?: string,
  ) {
    super();
    this.value = value;
  }

  /**
   * Getter: value
   */
  get id(): string{
    return this.value;
  }

  /**
   * Getter: label
   */
  get name(): string{
    return this.label;
  }
}
