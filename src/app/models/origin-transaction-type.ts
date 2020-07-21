import { SelectOption } from './select-option';
import { OriginTransactionTypeEnum } from '../enums/origin-transaction-type';



export class OriginTransactionType extends SelectOption {


  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case OriginTransactionTypeEnum.card:
        this.label = this.label?this.label:'Tarjeta débito/crédito';
        break;
      case OriginTransactionTypeEnum.bankTransfer:
        this.label = this.label?this.label:'Transferencia bancaria';
        break;
      case OriginTransactionTypeEnum.cash:
        this.label = this.label?this.label:'Efectivo';
        break;
      case OriginTransactionTypeEnum.deposit:
        this.label = this.label?this.label:'Depósito';
        break;
      case OriginTransactionTypeEnum.pey1:
        this.label = this.label?this.label:'Pago';
        break;
      case OriginTransactionTypeEnum.pey2:
        this.label = this.label?this.label:'Cobro';
        break;
      case OriginTransactionTypeEnum.requestReceived:
        this.label = this.label?this.label:'Solicitud rrecibida';
        break;
        case OriginTransactionTypeEnum.auction:
        this.label = this.label?this.label:'Remate';
        break;
        case OriginTransactionTypeEnum.requestReceived:
        this.label = this.label?this.label:'Credito';
        break;
    }
  }
}
