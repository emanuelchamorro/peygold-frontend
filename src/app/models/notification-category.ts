import { SelectOption } from './select-option';
import { NotificationCategoryEnum } from '../enums/notification-category-enum';



export class NotificationCategory extends SelectOption {


  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case NotificationCategoryEnum.sistema:
        this.label = this.label?this.label:'Sistema';
        break;
      case NotificationCategoryEnum.pagos:
        this.label = this.label?this.label:'Pagos';
        break;
      case NotificationCategoryEnum.tarjeta:
        this.label = this.label?this.label:'Tarjeta';
        break;
      case NotificationCategoryEnum.creditos:
        this.label = this.label?this.label:'Credito';
        break;
      case NotificationCategoryEnum.remates:
        this.label = this.label?this.label:'Remates';
        break;
     }
  }
}
