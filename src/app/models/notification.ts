import { Model } from './model';
import { SelectOption } from './select-option';
import { User } from './user';

export class Notification extends Model {

    id: number;
    title: string;
    message: string;
    image: string;
    date: string;
    category: SelectOption; //(Registro, verificacion, trasanction )
    status:boolean //leida, sin leer
    sender:User;


}