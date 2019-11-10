import { Injectable } from '@angular/core';
import { IdentificationType } from '../models/identification-type';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class MercadoPago {

  /**
   * Get the mercadopago instance from the window object.
   */
  private get instance(): any {
    return _window().Mercadopago;
  }

  /**
   * Set the publishable key
   * @param key The key value
   */
  setPublishableKey(key: string): void {
    this.instance.setPublishableKey(key);
  }

  /**
   * Get the list of identification types from mercadopago
   * return Promise<Array<IdentificationType>>
   */
  getIdentificationTypes(): Promise<Array<IdentificationType>> {
    return new Promise((resolve, reject) => {
      this.instance.getIdentificationTypes((status, results) => {
        if (status === 200) {
          resolve(results.map((identification) => {
            const mIdentification = new IdentificationType();

            mIdentification.id = identification.id;
            mIdentification.maxLength = identification.max_length;
            mIdentification.minLength = identification.min_length;
            mIdentification.name = identification.name;
            mIdentification.type = identification.type;

            return mIdentification;
          }));
        } else {
          reject([]);
        }
      });
    });
  }

  /**
   * Get payment method from mercadopago API.
   * @param params The request params. See the mercadopago docs.
   */
  getPaymentMethod(params: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance.getPaymentMethod(params, (status, results) => {
        if (status === 200) {
          resolve(results[0] || []);
        } else {
          reject([]);
        }
      });
    });
  }

  /**
   * Create the token in mercadopago with the creditcard info.
   * @param params The request params. See the mercadopago docs. See the mercadopago docs.
   */
  createToken(params: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance.createToken(params, (status, results) => {
        if (status === 200 || status === 201) {
          resolve(results.id);
        } else {
          reject(status);
        }
      });
    });
  }
}
