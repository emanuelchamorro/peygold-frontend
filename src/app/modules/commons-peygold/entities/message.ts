import {Model} from '../../../models/model';
import {MessageTypeEnum} from '../../../enums';

/**
 * Message entity
 */
export class Message extends Model {

  public type: MessageTypeEnum;
  public action: string;

  constructor(
    public title?: string,
    public value?: string
  ) {
    super();
  }


  /**
   * Return true is a success message
   */
  get isSuccess(): boolean {
    return this.is(MessageTypeEnum.Success);
  }

  /**
   * Return true is a error message
   */
  get isError(): boolean {
    return this.is(MessageTypeEnum.Error);
  }

  /**
   * Return true if the type is equal to the type parameter.
   * @param type MessageTypeEnum
   */
  public is(type: MessageTypeEnum): boolean {
    return this.type && this.type === type;
  }
}
