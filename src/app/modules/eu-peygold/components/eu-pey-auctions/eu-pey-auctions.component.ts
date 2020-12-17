import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Auction } from '../../../../models/auction';
import { environment } from '../../../../../environments/environment';
import { BaseComponent } from '../base.component';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { AuctionsService } from '../../services/auctions.service';

@Component({
  selector: 'app-eu-pey-auctions',
  templateUrl: './eu-pey-auctions.component.html',
  styleUrls: ['./eu-pey-auctions.component.scss']
})
export class EuPeyAuctionsComponent extends BaseComponent implements OnInit {

  private auctions: PaginationResponse;
  public auction: Auction;
  public step: number = 1;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  public amountOrder: number = 0;
  public discountOrder: number = -1;
  public word: string = '@';
  public filter:string;

  private title: string;
  private message: string;
  private showImageBottom: boolean;
  private sendType: number;
  private routeTo: string;
  private buttonLabel: string;

  constructor(private spinnerService: NgxSpinnerService,
    private auctionService: AuctionsService) {
    super();
  }

  ngOnInit() {

    this.spinnerService.show();
    this.auctionService.loadAuctionAvailable(this.amountOrder, this.discountOrder, this.word, 1, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('auctions', response);

      this.auctions = response;

      if (this.auctions.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
      }
    );
  }
  /**
 * select peygold credit in auction
 * @param auction 
 */
  selectPeygoldCredit(auction: Auction) {
    this.auction = auction;

  }

  /**
* load page de loans
* @param page 
*/
  loadPage(page: number) {
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.auctionService.loadAuctionAvailable(this.amountOrder, this.discountOrder, this.word, page, environment.paginator.per_page).then((response: PaginationResponse) => {
      console.log('auctions', response);
      this.auctions = response;

      if (this.auctions.data.length > 0) {
        this.page = response.page;
        this.previousPage = 1;
        this.totalItems = response.count;
        console.log('count record', this.totalItems);
        this.showPagination = true;
      } else {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
      }
      this.spinnerService.hide();
    }).catch(
      (erro) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
      }
    )

  }

  /**
  * set order 
  * @param order 
  */
  setAmountOrder(order: number) {
    this.word = '@';
    if(order== -1){
      this.amountOrder = 0;
      this.discountOrder = -1;
    }else{
      this.amountOrder = order;
      this.discountOrder = -1;
    }

    this.loadPage(1);
  }


  /**
  * set order 
  * @param order 
  */
  setDiscountOrder(order: number) {
    this.word = '@';
    if(order == -1){
      this.amountOrder = 0;
      this.discountOrder = -1;
    }else{
      this.discountOrder = order;
      this.amountOrder = -1;
    }

    this.loadPage(1);
  }

    /**
   * search loans by word
   * @param filter 
   */
  search(filter:string){
    console.log('filter',this.filter);
    this.amountOrder = 0;
    this.discountOrder = 0;
    if(this.filter.length>3){
      this.word = this.filter;
      this.loadPage(1);
    }else if(this.filter.length == 0){
      this.word = '@';
      this.loadPage(1);
    }
  }


  continue() {
    this.step++;
  }

  confirm() {
    this.spinnerService.show();
    this.auctionService.acceptAuction(this.auction.id, this.auction.transaction.amountToAuction).then(
      (resp:any)=>{
        this.spinnerService.hide();
        this.title = "¡Compra exitosa!";
        this.message = `Los ${this.auction.transaction.type.coin} ${this.auction.transaction.amountToAuction} ya son tuyos. Tendras el importe disponible en tu billetera en la brevedad`;
        this.showImageBottom = false;
        this.buttonLabel = "Ir a remates";
        this.routeTo = this.routes.auctions.index.href;
        this.step++;
      }
    ).catch(
      (error:any)=>{
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible acreditar los peygolds créditos.')
      }
    )

  }

}
