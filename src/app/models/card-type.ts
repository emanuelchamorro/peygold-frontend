import { SelectOption } from './select-option';
import { CardTypeEnum } from '../enums/card-type';



export class CardType extends SelectOption {


  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case CardTypeEnum.type1:
        this.label = this.label?this.label:'Mstercard';
        break;
      case CardTypeEnum.type2:
        this.label = this.label?this.label:'Visa';
        break;
    }
  }
}
