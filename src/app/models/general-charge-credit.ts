import { SelectOption } from './select-option';
import { EffectType } from './effect-type';
import { EffectApplicationType } from './effect-application-type';
import { State } from './state';


/**
 * Bank model
 */
export class GeneralChargeCredit extends SelectOption {

  public idChargeCredit: number;
  public effect: EffectType;
  public effectApplication: EffectApplicationType;
  public amount: number;
  public amountStr: string;
  public state:State;
  public deleted:boolean;




}
