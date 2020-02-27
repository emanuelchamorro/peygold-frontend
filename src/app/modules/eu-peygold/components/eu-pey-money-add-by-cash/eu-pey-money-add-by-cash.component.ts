import { Component, OnInit } from '@angular/core';
import {EuPeyMoneyAddComponent} from '../eu-pey-money-add/eu-pey-money-add.component';
import { TransactionsService } from '../../services/transactions.service';
import { OriginTransactionType } from 'src/app/models/origin-transaction-type';
import { Transaction } from '../../../../models';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eu-pey-money-add-by-cash',
  templateUrl: './eu-pey-money-add-by-cash.component.html',
  styleUrls: ['./eu-pey-money-add-by-cash.component.scss']
})
export class EuPeyMoneyAddByCashComponent extends EuPeyMoneyAddComponent implements OnInit {

  constructor(private transactionsService:TransactionsService,
    private spinnerService:NgxSpinnerService) {
    super();
  }

  ngOnInit() {
  }

  sendTransaction(transaction: Transaction) {
    this.transaction = transaction;
    this.transaction.originRecharge = new OriginTransactionType('7');
    this.spinnerService.show();
    this.transactionsService.createExternal(this.transaction).then(
      (resp)=>{
        console.log(resp);
        if(resp.success){
          this.spinnerService.hide();
          this.transaction.paymentCode = this.getRandomInt(100000,200000);
        }else{
          this.spinnerService.hide();
          this.setError("Ha ocurrido un error. No fué posible recargar tu billetera.");
        }
      }).catch(
        (error)=>{
          console.log(error);
          this.spinnerService.hide();
          this.setError("Ha ocurrido un error. No fué posible recargar tu billetera.");
      });
  }

}
