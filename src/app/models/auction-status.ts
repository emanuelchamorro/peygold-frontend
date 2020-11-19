import { SelectOption } from './select-option';
import { AuctionStatusEnum } from '../enums/auction-enum-status';


/**
 * AuctionStatus model
 */
export class AuctionStatus extends SelectOption {

  constructor(
    value?: string,
    public label?: string,
  ) {
    super(value);

    switch (this.value) {
      case AuctionStatusEnum.Actived:
        this.label = this.label ? this.label : 'Activo';
        break;
      case AuctionStatusEnum.Pused:
        this.label = this.label ? this.label : 'Pausado';
        break;
      case AuctionStatusEnum.Finished:
        this.label = this.label ? this.label : 'Finalizado';
        break;
    }
  }
}
