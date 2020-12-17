import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { Auction } from '../../../models/auction';
import { PaginationResponse } from '../../commons-peygold/entities/pagination-response';
import { AuctionStatus } from '../../../models/auction-status';
import {Transaction, TransactionType, User} from '../../../models';
import { TransactionTypeEnum } from '../../../enums';


@Injectable({
  providedIn: 'root'
})
export class AuctionsService extends HttpService {


  /**
 * Start an auction
 * @return Promise
 */
  createAuction(auction: Auction) {
    return this.post('/remates', {
      daysExpiration: auction.duration,
      amount: parseFloat(auction.transaction.amountToAuction),
      discount: parseInt(auction.discount),
      month: auction.month,
      year: auction.year

    }).toPromise();
  }

  /**
   * update auction by id
   * @param auction 
   */
  updateAuction(auction:Auction){
    return this.put(`/remates/${auction.id}`,
      {
        remateId:auction.id,
        status: parseInt(auction.status.value),
        daysExpiration:auction.duration,
        discount: parseInt(auction.discount)

      }
    ).toPromise();
  }

    /**
   * update auction status by id
   * @param auction 
   */
  updateAuctionStatus(auction:Auction, status:number){
    return this.put(`/remates/${auction.id}`,
      {
        remateId:auction.id,
        status: status,
        daysExpiration:auction.duration,
        discount: parseInt(auction.discount)
      }
    ).toPromise();
  }

  loadAuctionByUser(status: number, sortAmount:number, word:string, page: number, perPage: number): Promise<PaginationResponse>{

    const paginator = new PaginationResponse(page, perPage);
    return this.get(`/remates/GetRematesByUser/${status}/${sortAmount}/${page}/${perPage}`).toPromise().then(
      (resp:any)=>{
        paginator.count = resp.recordCount;
        paginator.data = resp.rematesDTOs.map((item: any)=>{
          const auction = new Auction();

          auction.id = item.remateID;
          auction.duration = item.daysExpiration;
          auction.status = new AuctionStatus(String(item.status));
          auction.transaction = new Transaction();
          auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
          auction.transaction.amountToAuction = item.amount;
          auction.transaction.createdAt = item.creationDate;
          auction.discount = item.discount;
          auction.year = item.year;
          auction.month = item.month;
          if(item.receiver){
            auction.transaction.receiver = new User();
            auction.transaction.receiver.id = item.receiver.idUser;
            auction.transaction.receiver.idAspNetUser = item.receiver.idAspNetUser;
            auction.transaction.receiver.name = item.receiver.firstName;
            auction.transaction.receiver.lastName = item.receiver.lastName;
            auction.transaction.receiver.email = item.receiver.email;
            auction.transaction.receiver.phone = item.receiver.phone;
            auction.transaction.receiver.avatarURL = item.receiver.avatarURL;
            auction.transaction.receiver.fullName = item.receiver.fullName;
            auction.transaction.receiver.idUserType = item.receiver.idUserType;
            auction.transaction.receiver.active = item.receiver.active;
            auction.transaction.receiver.documentNumber = item.receiver.dni;
            auction.transaction.receiver.cuit = item.receiver.cuit;
            auction.transaction.receiver.systemUserTypeId = item.receiver.systemUserTypeId;
          }
          return auction;
        });
        console.log('paginator',paginator);
        return paginator;
      }
    ).catch(
      (error:any)=>{
        return paginator;
      }
    );
   }

   loadAuctionAvailable(amountOrder: number, discountOrder:number, word:string, page: number, perPage: number): Promise<PaginationResponse>{
    const paginator = new PaginationResponse(page, perPage);
    return this.post(`/remates/search/${word}/${page}/${perPage}`,{sortDiscount:discountOrder,sortAmount:amountOrder}).toPromise().then(
      (resp:any)=>{
        paginator.count = resp.recordCount;
        paginator.data = resp.rematesDTOs.map((item: any)=>{
          const auction = new Auction();
          auction.id = item.remateID;
          auction.duration = item.daysExpiration;
          auction.status = new AuctionStatus(String(item.status));
          auction.transaction = new Transaction();
          auction.transaction.type = new TransactionType(TransactionTypeEnum.CreditPoints);
          auction.transaction.amountToAuction = item.amount;
          auction.transaction.createdAt = item.creationDate;
          auction.discount = item.discount;
          auction.year = item.year;
          auction.month = item.month;


          if (item.sender) {
            auction.transaction.sender = new User();
            auction.transaction.sender.id = item.sender.idUser;
            auction.transaction.sender.idAspNetUser = item.sender.idAspNetUser;
            auction.transaction.sender.name = item.sender.firstName;
            auction.transaction.sender.lastName = item.sender.lastName;
            auction.transaction.sender.email = item.sender.email;
            auction.transaction.sender.phone = item.sender.phone;
            auction.transaction.sender.avatarURL = item.sender.avatarURL;
            auction.transaction.sender.fullName = item.sender.fullName;
            auction.transaction.sender.idUserType = item.sender.idUserType;
            auction.transaction.sender.active = item.sender.active;
            auction.transaction.sender.documentNumber = item.sender.dni;
            auction.transaction.sender.cuit = item.sender.cuit;
            auction.transaction.sender.systemUserTypeId = item.sender.systemUserTypeId;
          }


          return auction;

        });
        console.log('paginator',paginator);
        return paginator;
      }
    ).catch(
      (error:any)=>{
        return paginator;
      }
    );
   }

   acceptAuction(auctionId:number,amount:number){
      return this.post(`/remates/AceptarRemate`,{idRemate:auctionId, Amount: amount}).toPromise();
   }

}
