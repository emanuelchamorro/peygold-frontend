import { Injectable } from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {Balance, Transaction, TransactionType} from '../../../models';
import {map} from 'rxjs/operators';
import { Auction } from '../../../models/auction';
import { TransactionTypeEnum } from '../../../enums';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';

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

  

   /**
   * search summary peyglods credits by month and year
   * @param page 
   * @param perPage 
   */
  loadPeygoldsCredits(page: number, perPage: number): Promise<Array<Auction>>{

   return this.get('/peygoldsummaries/GetCreditosDisponiblesByUser')
    .pipe(map((peygoldsCredits: Array<any>)=> peygoldsCredits.map((item:any)=>{
      const auction = new Auction();
      auction.transaction = new Transaction();
      auction.transaction.amount= item.totalAmount;
      auction.transaction.amountToAuction = item.totalAmount; // monto maximo a subastar
      auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
      auction.year = item.year;
      auction.month = item.month;

      return auction;
    }))).toPromise();   

  }

   /**
   * search summary peyglods credits by month and year with filters
   * @param page 
   * @param perPage 
   */
  searchPeygoldsCredits(year: number, month:number, sortAmount:number, page: number, perPage: number): Promise<PaginationResponse>{
    const paginator = new PaginationResponse(page, perPage);
    return this.post(`/peygoldsummaries/search/${page}/${perPage}`,{year,month,sortAmount}).toPromise().then(
      (resp:any)=>{
        paginator.count = resp.recordCount;
        paginator.data = resp.creditosDTOs.map((item:any)=>{
          const auction = new Auction();
          auction.transaction = new Transaction();
          auction.transaction.amount= item.totalAmount; // monto total de la bolsa
          auction.transaction.amountToAuction = 0 // monto total de la bolsa
          auction.transaction.amountRemated = item.totalRematado; // monto total rematado
          auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
          auction.year = item.year;
          auction.month = item.month;

          return auction;
        });
        return paginator;
      }
    ).catch(
      (resp:any)=>{
        return paginator;
      }
    );   
 
   }


  /* const auction = new Auction();
   auction.transaction = new Transaction();
   auction.transaction.amount= item.totalAmount;
   auction.transaction.amountToAuction = item.totalAmount; // monto maximo a subastar
   auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
   auction.year = item.year;
   auction.month = item.month;

   return auction;*/


}
