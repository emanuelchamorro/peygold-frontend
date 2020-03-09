import {Check} from '../models';

export class CheckFactory{

    static make(check:Check): any{

        return {
            PaycheckId:check.id,
            CBU:check.gender==2?check.onwer.bussinessName:'0', //TODO: se setea la razon social
            CuentaEmisora:check.accountNumber,
            CUIT:check.onwer.cuit,
            DireccionBanco:check.address.addressFull,
            DNIFirmante:check.onwer.documentNumber,
            EmailFirmante:check.onwer.email?check.onwer.email:'test@test.com',//TODO: ESTE CAMPO NO DEBE OBLIGATORIO
            FechaEmisionCheque:"08/30/2019",
            FechaVencimientoCheque:"08/30/2020",
            FullNameFirmante:check.onwer.fullName,
            IdBank:check.bank.value,
            IdCity:check.address.city.value,
            IdState:check.address.state.value,
            NumeroCheque:check.number,
            TelefonoBanco:check.address.phone,
            TelefonoFirmante:check.onwer.phone
        }


    }
    
}