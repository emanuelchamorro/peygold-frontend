/**
 * OriginTransactionType enumerator
 */
export enum OriginTransactionTypeEnum {
  pey1 = '1', //pago
  card = '3', //ingreso con tarjeta
  pey2 = '6', //cobro
  bankTransfer = '9', //ingreso con transferencia
  deposit = '8', //ingreso con deposito 
  cash = '7', //ingreso con efectivo
  requestReceived = '10', // Solicides recibidas
  auction = '2', //remates
  credit = '4', //credit
  moneyIncome = '5' // ingreso de dinero
}