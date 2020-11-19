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


          if (item.userSender) {
            auction.transaction.sender = new User();
            auction.transaction.sender.id = item.userSender.idUser;
            auction.transaction.sender.idAspNetUser = item.userSender.idAspNetUser;
            auction.transaction.sender.name = item.userSender.firstName;
            auction.transaction.sender.lastName = item.userSender.lastName;
            auction.transaction.sender.email = item.userSender.email;
            auction.transaction.sender.phone = item.userSender.phone;
            auction.transaction.sender.avatarURL = item.userSender.avatarURL;
            auction.transaction.sender.fullName = item.userSender.fullName;
            auction.transaction.sender.idUserType = item.userSender.idUserType;
            auction.transaction.sender.active = item.userSender.active;
            auction.transaction.sender.documentNumber = item.userSender.dni;
            auction.transaction.sender.cuit = item.userSender.cuit;
            auction.transaction.sender.systemUserTypeId = item.userSender.systemUserTypeId;
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

   acceptAuction(auctionId:number){
      return this.post(`/remates/AceptarRemate`,{idRemate:auctionId}).toPromise();
   }

}
