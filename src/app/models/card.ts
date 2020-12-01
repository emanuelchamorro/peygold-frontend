import {Model} from './model';
import {Status} from './status';
import { User } from './user';
import { CardType } from './card-type';



export class Card extends Model{

    public id: number;
    public number: string;
    public status: Status;
    public dueDate:string;
    public amount:number;
    public pin:string;
    public repeatPin:string;
    public type:number;
    public namePrintedCard:string;
    public icon:string;
    public creationDate:any;
    public securityCode:number;
    public yearExpiration:number;
    public monthExpiration:number;
    public user:User;
    public creditCardType:CardType;


}