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
            FechaEmisionCheque: check.issuanceDate.month+'/'+check.issuanceDate.day+'/'+check.issuanceDate.year,
            FechaVencimientoCheque: check.expirationDate.month+'/'+check.expirationDate.day+'/'+check.expirationDate.year,
            FullNameFirmante:check.onwer.fullName,
            IdBank:check.bank.value,
            IdCity:check.address.city.value,
            IdState:check.address.state.value,
            NumeroCheque:check.number,
            TelefonoBanco:check.address.phone,
            TelefonoFirmante:check.onwer.phone,
            Comment:check.comments
        }


    }
    
}