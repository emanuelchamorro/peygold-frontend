import {ErrorResponse} from '../services/error-response';

export class BaseComponent {

  private messages = {
    errors: [],
  };

  /**
   * Clean the list of error messages.
   * @param delay Milliseconds to clean the error list
   */
  protected waitAndCleanErrors(delay = 10000): void {
    setTimeout(() => this.cleanErrors(), delay);
  }

  /**
   * Add a message to the error list.
   * @param message Message to add to error lisy
   */
  protected addError(message: string): void {
    this.messages.errors.push(message);
  }

  /**
   * Clen the error messages
   */
  protected cleanErrors(): void {
    this.messages.errors = [];
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
    this.addError(e.message);
    this.waitAndCleanErrors();
  }
}
