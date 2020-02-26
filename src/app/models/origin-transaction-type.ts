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
            this.label = 'Tarjeta débito/crédito';
            break;
          case OriginTransactionTypeEnum.bankTransfer:
            this.label = 'Transferencia bancaria';
            break;
          case OriginTransactionTypeEnum.cash:
            this.label = 'Efectivo';
            break;
          case OriginTransactionTypeEnum.deposit:
            this.label = 'Depósito';
            break;
        }
      }
}
