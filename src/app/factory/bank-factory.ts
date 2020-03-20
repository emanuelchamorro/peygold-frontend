import { Bank } from '../models/bank';

export class BankFactory{

    static make(bank:Bank ): any{
        return {
            idBank: bank.idBank,
            bankName: bank.socialReason,
            bankCUIT: bank.cuit,
            bankPhone: bank.contactUser.phone,
            bankEmail: bank.contactUser.email,
            street: bank.address.street,
            streetNumber: bank.address.houseNumber,
            floor: bank.address.floor,
            postalCode: bank.address.zipCode,
            idCountry: parseInt(bank.address.country.value),
            idState: parseInt(bank.address.state.value),
            idCity: parseInt(bank.address.city.value),
            deleted: bank.deleted ?  bank.deleted : false   
        }

    }
}