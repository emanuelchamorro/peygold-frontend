import {ErrorResponse} from '../entities/error-response';
import {NgModel} from '@angular/forms';
import {Message} from '../entities/message';
import {routes as CommonsRoutes} from '../routes';
import {Router} from '@angular/router';
import {MessageTypeEnum} from '../../../enums';

export class BaseComponent {

  protected isBusy = false;

  protected submitted = false;

  /**
   * Should be injected by the child components.
   */
  protected router: Router;

  private messages = {
    errors: [],
    success: [],
  };

  private fieldError:string;

  /**
   * Clean the list of error messages.
   * @param delay Milliseconds to clean the error list
   */
  public waitAndCleanErrors(delay = 10000): void {
    setTimeout(() => this.cleanErrors(), delay);
  }

  /**
   * Clean the list of success messages.
   * @param delay Milliseconds to clean the success list
   */
  public waitAndCleanSuccess(delay = 10000): void {
    setTimeout(() => this.cleanSuccess(), delay);
  }

  /**
   * Add a message to the error list.
   * @param message Message to add to error list
   */
  protected addError(message: string, clean = true): BaseComponent {
    this.messages.errors.push(message);
    if (clean) {
      this.waitAndCleanErrors();
    }
    return this;
  }

  /**
   * Add a message to the success list.
   * @param message Message to add to success list
   */
  protected addSuccess(message: string, clean = true): BaseComponent {
    this.messages.success.push(message);
    if (clean) {
      this.waitAndCleanSuccess();
    }
    return this;
  }

  /**
   * Clean the error message and add just one error message
   * @param message Message to add to error list
   */
  protected setError(message: string, clean = true): BaseComponent {
    this.cleanErrors();
    this.addError(message);
    if (clean) {
      this.waitAndCleanErrors();
    }
    return this;
  }

    /**
   * Clean the error message and add just one error message
   * @param message Message to add to error list
   */
  protected setInputError(message: string, clean = true): BaseComponent {
    this.fieldError = message;

    if (clean) {
      setTimeout(() => this.fieldError = '', 1000);
    }
    return this;
  }

  /**
   * Clean the success message and add just one success message
   * @param message Message to add to success list
   */
  protected setSuccess(message: string, clean = true): BaseComponent {
    this.cleanErrors();
    this.addSuccess(message);
    if (clean) {
      this.waitAndCleanSuccess();
    }
    return this;
  }

  /**
   * Clean the error messages
   */
  protected cleanErrors(): void {
    this.messages.errors = [];
  }

  /**
   * Clean the success messages
   */
  protected cleanSuccess(): void {
    this.messages.success = [];
  }

  /**
   * Return the current error to be displayed.
   */
  get error(): string {
    return this.messages.errors[0] || '';
  }

  /**
   * Return the current error to be displayed.
   */
  get success(): string {
    return this.messages.success[0] || '';
  }

    /**
   * Return the current error to be displayed.
   */
  get inputError(): string {
    return this.fieldError;
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
   * Manage the error api response and save it in the error message list.
   */
  protected catchError(e: ErrorResponse): void {
    this.unbusy();
    if (e.status === 0) {
      this.setDefaultError().waitAndCleanErrors();
    }

    this.addError(e.message).waitAndCleanErrors();
  }

  /**
   * Add a default message to the error list.
   * @param message Message to add to error lisy
   */
  protected setDefaultError(): BaseComponent {
    return this.addError('Ha ocurrido un error. Intente mas tarde.');
  }

  /**
   * Add a default message to the error list.
   * @param message Message to add to error lisy
   */
  protected setDefaultSuccess(): BaseComponent {
    return this.addSuccess('Los cambios se han realizado satisfactoriamente.');
  }

  /**
   * Set false to the busy attribute
   * @return void
   */
  protected unbusy(): void {
    this.isBusy = false;
  }

  /**
   * Set true the busy attribute
   * @return void
   */
  protected busy(): void {
    this.isBusy = true;
  }

  /**
   * Return the home URL.
   * This url is configured on user login.
   */
  protected get home(): string {
    return '/eu/home';
    // return localStorage.getItem('app_home');
  }

  /**
   * Set the home URL.
   * This url is configured on user login.
   */
  protected set home(url: string) {
    localStorage.setItem('app_home', url);
  }

  /**
   * Return the context URL.
   * This value is configured on user login.
   */
  protected get context(): string {
    return '/eu';
    // return localStorage.getItem('app_context');
  }

  /**
   * Set the context URL.
   * This value is configured on user login.
   */
  protected set context(url: string) {
    localStorage.setItem('app_context', url);
  }


  /**
   * Redirect to feedback component and show the success message
   * @param message The message to be shown
   * @return void
   */
  protected showSuccessFeedback(message: Message): void {
    message.type = MessageTypeEnum.Success;
    this.showFeedback(message);
  }

  /**
   * Redirect to feedback component and show the error message
   * @param message The message to be shown
   * @return void
   */
  protected showErrorFeedback(message: Message): void {
    message.type = MessageTypeEnum.Error;
    this.showFeedback(message);
  }

  /**
   * Redirect to feedback component and show the message
   * @param message The message to be shown
   * @return void
   */
  protected showFeedback(message: Message): void {
    // const url = this.context + '/' + CommonsRoutes.feedback.href;
    const url = '/eu' + CommonsRoutes.feedback.href;

    if (! this.router) {
      console.error('No router defined in the component. Please add the Router Provider in the component');
      return;
    }

    this.router.navigateByUrl(url, {
      state : {
        securedRedirection: true,
        message
      }
    });
  }

  /**
   * Move the scroll to the top of the screen.
   */
  protected scrollToTop() {
    window.scroll(0,0);
  }
}
