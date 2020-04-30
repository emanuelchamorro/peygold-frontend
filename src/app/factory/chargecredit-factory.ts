import { CheckRescue } from "../models/check-rescue";
import { GeneralChargeCredit } from "../models/general-charge-credit";


export class ChargeCreditFactory{

    static make(generalChargeCredit: GeneralChargeCredit, type:number ): any{

        if(type==1){//Genera
            return {
                IdConceptoCargoAbono: generalChargeCredit.idChargeCredit,
                NombreCargoAbono: generalChargeCredit.label,
                Signo: generalChargeCredit.effect.value,
                ObtenerDeBase: generalChargeCredit.effectApplication.value == '1'? true: false,
                ObtenerDeComision: generalChargeCredit.effectApplication.value == '2'? true: false,
                Porcentaje: parseFloat(generalChargeCredit.amountStr) / 100,            
                Deleted: generalChargeCredit.deleted ?  generalChargeCredit.deleted : false 
    
            }
        }else{// Por provincia
            return {
                IdConceptoCargoAbonoProvincia: generalChargeCredit.idChargeCredit,
                NombreCargoAbono: generalChargeCredit.label,
                Signo: generalChargeCredit.effect.value,
                ObtenerDeBase: generalChargeCredit.effectApplication.value == '1'? true: false,
                ObtenerDeComision: generalChargeCredit.effectApplication.value == '2'? true: false,
                Porcentaje: parseFloat(generalChargeCredit.amountStr) / 100,            
                Deleted: generalChargeCredit.deleted ?  generalChargeCredit.deleted : false,
                IdState: generalChargeCredit.state.value
    
            }
        }


    }
}