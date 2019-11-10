import {ErrorResponse} from '../entities/error-response';
import {NgModel} from '@angular/forms';

export class BaseComponent {

  protected isBusy = false;

  private messages = {
    errors: [],
  };

  /**
   * Clean the list of error messages.
   * @param delay Milliseconds to clean the error list
   */
  public waitAndCleanErrors(delay = 10000): void {
    setTimeout(() => this.cleanErrors(), delay);
  }

  /**
   * Add a message to the error list.
   * @param message Message to add to error lisy
   */
  protected addError(message: string): BaseComponent {
    this.messages.errors.push(message);
    return this;
  }

  /**
   * Clen the error messages
   */
  protected cleanErrors(): void {
    this.messages.errors = [];
  }

  /**
   * Checks if the register form is able to continue with the next step.
   */
  isValidFormModels(models: Array<NgModel>): boolean {
    let valid = true;
    models.map((model) => {
      if (model.invalid) {
        valid = false;
        return;
      }
    });

    return valid;
  }

  /**
   * Return the current error to be displayed.
   */
  get error(): string {
    return this.messages.errors[0] || '';
  }

  /**
   * Manage the error api response and save it in the error message list.
   */
  protected catchError(e: ErrorResponse): void {
    this.unbusy();
    if (e.status === 0) {
      this.addDefaultError().waitAndCleanErrors();
    }

    this.addError(e.message).waitAndCleanErrors();
  }

  /**
   * Add a default message to the error list.
   * @param message Message to add to error lisy
   */
  protected addDefaultError(): BaseComponent {
    return this.addError('Ha ocurrido un error. Intente mas tarde.');
  }

  /**
   * Set false to the busy attribute
   * @return void
   */
  protected unbusy(): void{
    this.isBusy = false;
  }

  /**
   * Set true the busy attribute
   * @return void
   */
  protected busy(): void{
    this.isBusy = true;
  }
}
