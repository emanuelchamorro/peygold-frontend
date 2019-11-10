/**
 * AddMoneyTransaction model
 */
export class AddMoneyTransaction {

  constructor(
    public customerEmail: string,
    public amount: number,
    public description: string,
    public paymentMethod: string,
    public cardToken: string,
    public idTransactionType: number,
  ) {}
}
