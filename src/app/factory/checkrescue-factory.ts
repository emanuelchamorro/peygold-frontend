import { CheckRescue } from "../models/check-rescue";


export class CheckRescueFactory{

    static make(checkRescue:CheckRescue ): any{
        return {
            CheckRescueId: checkRescue.idCheckRescue,
            CheckRescueName: checkRescue.label,
            Deleted: checkRescue.deleted ?  checkRescue.deleted : false 
        }

    }
}