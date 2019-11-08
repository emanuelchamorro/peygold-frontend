import { Injectable } from '@angular/core';
import {IdentificationType} from '../models/identification-type';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class MercadoPago {

  private get instance(): any {
    return _window().Mercadopago;
  }

  setPublishableKey(key: string): void {
    this.instance.setPublishableKey(key);
  }

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
}
