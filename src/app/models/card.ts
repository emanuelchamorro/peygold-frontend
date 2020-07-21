import {Model} from './model';
import {Status} from './status';



export class Card extends Model{

    public id: number;
    public number: string;
    public status: Status;
    public dueDate:string;
    public amount:number;
    public pin:string;
    public repeatPin:string;

}