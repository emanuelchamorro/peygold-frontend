/**
 * SelectOption model
 */
export class SelectOption {

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
    this.value = value;
  }

  get id(): string{
    return this.value;
  }
}
