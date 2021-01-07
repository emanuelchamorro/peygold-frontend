import { CreditCard } from '../models';
import { Card } from '../models/card';


export class CardFactory {

    static makeCardToEntity(card: Card): any {

        return {
            CardNumber: card.number,
            YearExpiration:card.yearExpiration,
            MonthExpiration:card.monthExpiration,
            DocumentNumber: card.user.documentNumber,
            DocumentType: parseInt(card.user.documentType.value),
            PrintedName:card.user.fullName,
            SecurityCode:card.securityCode,
            CardType: parseInt(card.creditCardType.value)
        }
    }

    static makeCreditCardToEntity(card: CreditCard): any {

        return {
            CardNumber: card.number,
            YearExpiration:card.expirationYear,
            MonthExpiration:card.expirationMonth,
            DocumentNumber: card.identificationNumber,
            DocumentType: card.identificationType.value,
            PrintedName:card.holderName,
            SecurityCode:card.securityCode,
            CardType: 1
        }
    }
}