import { SelectOption } from './select-option';
import { EffectType } from './effect-type';
import { EffectApplicationType } from './effect-application-type';
import { State } from './state';


/**
 * Bank model
 */
export class GeneralChargeCredit extends SelectOption {

  public effect: EffectType;
  public effectApplication: EffectApplicationType;
  public amount: number;
  public state:State;
  public deleted:boolean;




}
