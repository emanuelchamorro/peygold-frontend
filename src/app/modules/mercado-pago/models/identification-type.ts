/**
 * MercadoPago Identification Type.
 */
export class IdentificationType {

  public id: string;
  public maxLength: number;
  public minLength: number;
  public name: string;
  public type: string;

  constructor() {}

  get value():number{
    let value;
    switch (this.id) {
      case 'DNI':
        value = 1
        break;
      case 'Cédula':
        value = 2
        break;
      case 'L.C.':
        value = 3
        break;
      case 'L.E.':
        value = 4
        break;
      case 'Otro':
        value = 5
        break;
    }

    return value;
  }
}
