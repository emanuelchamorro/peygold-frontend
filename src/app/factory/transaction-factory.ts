
import { Transaction } from '../models/transaction';


export class TransactionFactory {

    static makeTransactionToEntity(transaction: Transaction,indicateAmount:boolean): any {

        const trans = new Array<any>();

        if(indicateAmount){
            if(!transaction.type.isMultiPey){
                trans.push({monto: transaction.amount, tipoTransaccion:parseInt(transaction.type.id)});
            }else{
                transaction.multiPey.forEach(item => {
                    trans.push({monto: item.amount, tipoTransaccion:parseInt(item.type.id)});
                });
            }
        }
        return trans;

    }

}