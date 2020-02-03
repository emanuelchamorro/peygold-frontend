import {LoanRequest, LoanOption, SelectOption} from '../models';

export class LoanFactory{

    static make(loanRequest:LoanRequest, loanOption:LoanOption, loanRescueOption:SelectOption ): any{
        let details = new Array<any>();
        loanOption.checks.forEach((check,index) => {
            details.push(
                {
                    expirationOptionsId: index+1,
                    amountToPay: check.amount,
                    CBU: "123-4567891-2",
                    CuentaEmisora:check.accountNumber,
                    DireccionBanco: check.address.addressFull,
                    DNIFirmante: check.onwer.documentNumber,
                    EmailFirmante: check.onwer.email,
                    FechaEmisionCheque: check.issuanceDate.day+'/'+check.issuanceDate.month+'/'+check.issuanceDate.year,
                    FechaVencimientoCheque: check.expirationDate.day+'/'+check.expirationDate.month+'/'+check.expirationDate.year, 
                    FullNameFirmante: check.onwer.fullName,
                    IdBank: check.bank.value,
                    IdCity: check.address.city.value,
                    IdState: check.address.state.value,
                    NumeroCheque: check.number,
                    TelefonoBanco: check.address.phone,
                    TelefonoFirmante: check.onwer.phone,
                    frontCheck: {
                        name: 'frontCheck.jpeg',
                        data: check.frontImage,
                        mimeType: 'image/jpeg'
                    },
                    reverseCheck:{
                        name: 'reverseCheck.jpeg',
                        data: check.backImage,
                        mimeType: 'image/jpeg'
                    }
                }
            )
        });
        return {
            requestedAmount: loanRequest.amount,
            InsuranceCarrierId: 1,
            CheckRescueId: parseInt(loanRescueOption.value),
            PaymentMethodId:1,
            CreditDestinationId: parseInt(loanRequest.creditDestination.value),
            Comments: loanRequest.notes,
            ExpirationOptionsDetails:details             
        }


    }
}