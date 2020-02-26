import {LoanRequest, LoanOption, SelectOption} from '../models';
import { InsuranceCarrier } from '../models/insurance-carrier';

export class InsuranceCarrierFactory{

    static make(insuranceCarrier:InsuranceCarrier ): any{
        return {
            insuranceCarrierId: insuranceCarrier.id,
            insuranceSocialReason: insuranceCarrier.socialReason,
            insuranceCUIT: insuranceCarrier.cuit,
            contactName: insuranceCarrier.contactUser.name,
            contactPhone: insuranceCarrier.contactUser.phone,
            contactEmail: insuranceCarrier.contactUser.email,
            street: insuranceCarrier.address.street,
            houseNumber: insuranceCarrier.address.houseNumber,
            floor: insuranceCarrier.address.floor,
            postalCode: insuranceCarrier.address.zipCode,
            idCountry: parseInt(insuranceCarrier.address.country.value),
            idState: parseInt(insuranceCarrier.address.state.value),
            idCity: parseInt(insuranceCarrier.address.city.value),
            idBank: parseInt(insuranceCarrier.bank.value),
            cbu: insuranceCarrier.cbu,
            cuentaCorriente: insuranceCarrier.currentAccount ? insuranceCarrier.currentAccount : null,
            deleted: insuranceCarrier.deleted ?  insuranceCarrier.deleted : false   
        }


    }
}