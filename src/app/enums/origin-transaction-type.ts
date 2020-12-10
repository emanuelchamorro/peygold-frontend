/**
 * OriginTransactionType enumerator
 */
export enum OriginTransactionTypeEnum {
  pey1 = '1', //pago o envio de dinero
  card = '3', //ingreso con tarjeta
  pey2 = '6', //cobro
  bankTransfer = '9', //ingreso con transferencia
  deposit = '8', //ingreso con deposito 
  cash = '7', //ingreso con efectivo
  requestReceived = '2', // Solicides recibidas
  auction = '10', //remates
  credit = '4', //credit
  moneyIncome = '5', // ingreso de dinero
  cardRecharge = '11' // Recarga de tarjeta prepagada
}