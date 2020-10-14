import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Balance, Transaction, TransactionType, TransactionStatus} from '../../../models';
import {map} from 'rxjs/operators';
import { Auction } from 'src/app/models/auction';
import { TransactionTypeEnum } from '../../../enums';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService {

  /**
   * Get the user balance.
   */
  balances(): Promise<Array<Balance>> {
    return this.get('/balance')
      .pipe(
        map((balances: Array<any>) => balances.map((item: any) => {
            const balance = new Balance();
            balance.amount = item.amount || item.ammount;
            balance.currencyName = item.currencyName;
            balance.pendingAmount = item.pendingAmount || item.pendingAmmount;

            return balance;
          })
        )
      ).toPromise();
  }

  

  loadPeygoldsCredits(): Array<Auction> /*Promise<Array<Auction>>*/{

    const peygoldCreditsToAuction = new Array<Auction>();
    
    let auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 1500;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2020-11-20';
    peygoldCreditsToAuction.push(auction);

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 200;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2020-11-25';
    peygoldCreditsToAuction.push(auction);

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 4500;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2020-12-09';
    peygoldCreditsToAuction.push(auction);

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 2890;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2021-01-25';
    peygoldCreditsToAuction.push(auction);

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 900;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2021-01-30';
    peygoldCreditsToAuction.push(auction);



    
    
    return peygoldCreditsToAuction;

  }


  loadPeygoldsCreditsInAuction(): Array<Auction> /*Promise<Array<Auction>>*/{

    const peygoldCreditsToAuction = new Array<Auction>();
    
  /*let auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 1500;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2020-11-20';
    auction.transaction.amountToAuction= 1500;
    auction.discount = 5;
    auction.duration = 20;
    auction.transaction.createdAt = new Date();
    peygoldCreditsToAuction.push(auction);
    

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 200;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2020-11-25';
    auction.transaction.amountToAuction= 100;
    auction.discount = 2;
    auction.duration = 19;
    auction.transaction.createdAt = new Date();
    peygoldCreditsToAuction.push(auction);

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 4500;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2020-12-09';
    auction.transaction.amountToAuction= 2500;
    auction.discount = 6;
    auction.duration = 10;
    auction.transaction.createdAt = new Date();
    peygoldCreditsToAuction.push(auction);

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 2890;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2021-01-25';
    auction.transaction.amountToAuction= 1500;
    auction.discount = 5;
    auction.duration = 10;
    auction.transaction.createdAt = new Date();
    peygoldCreditsToAuction.push(auction);

    auction = new Auction();
    auction.transaction = new Transaction();
    auction.status = new TransactionStatus('6');
    auction.transaction.amount = 900;
    auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
    auction.expirationDate = '2021-01-30';
    auction.transaction.amountToAuction= 500;
    auction.discount = 2;
    auction.duration = 12;
    auction.transaction.createdAt = new Date();
    peygoldCreditsToAuction.push(auction);*/

    
    
    return peygoldCreditsToAuction;

  }

}
