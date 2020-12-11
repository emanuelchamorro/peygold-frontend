import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Auction } from '../../../../models/auction';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { BaseComponent } from '../base.component';
import { environment } from '../../../../../environments/environment';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { AuctionsService } from '../../services/auctions.service';

@Component({
  selector: 'app-eu-pey-myauctions',
  templateUrl: './eu-pey-myauctions.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
  `]
})
export class EuPeyMyauctionsComponent extends BaseComponent implements OnInit {

  @ViewChild('datepicker',{static:false, read: ElementRef }) private inputDuration: ElementRef;

  public step: number = 1;
  private auctions: PaginationResponse;
  public auction: Auction;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  public status: number = 0;
  public order: number = 0;

  //
  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  maxDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(
    private calendar: NgbCalendar,
    private spinnerService: NgxSpinnerService,
    private auctionService: AuctionsService) {
    super();

  }

  ngOnInit() {
    

    this.spinnerService.show();
    this.auctionService.loadAuctionByUser(this.status, this.order, '@', 1, environment.paginator.per_page).then((response: PaginationResponse) => {
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
    let initDateAuction = new Date(this.auction.transaction.createdAt);
    let expirationDatePeygoldsCredit = this.auction.expirationDate;

    this.minDate = new NgbDate(initDateAuction.getFullYear(),initDateAuction.getMonth()+1,initDateAuction.getDate());
    this.maxDate = new NgbDate(expirationDatePeygoldsCredit.getFullYear(),expirationDatePeygoldsCredit.getMonth()+1,expirationDatePeygoldsCredit.getDate());
    this.fromDate = this.minDate;
    this.toDate = new NgbDate(initDateAuction.getFullYear(),initDateAuction.getMonth()+1, initDateAuction.getDate() + this.auction.duration);
    this.step++;
    setTimeout(()=>{
      let inputDurationElem:HTMLInputElement = this.inputDuration.nativeElement;
      inputDurationElem.value = String(this.auction.duration);
    },100)

    
  }

  saveAuction() {
    this.spinnerService.show();
    this.auctionService.updateAuction(this.auction).then(
      (resp:any)=>{
        this.spinnerService.hide();
        console.log('resp',resp);
        this.step = 1
        this.auction = null;
      }
    ).catch(
      (error:any)=>{
        this.spinnerService.hide();
        console.log('resp',error);
        this.setError('Ha ocurrido un error. No es posible actualizar el remate.')
      }
    );
  }

  changeAuctionStatus(auction:Auction, status:number){
    this.spinnerService.show();
    this.auctionService.updateAuctionStatus(auction, status).then(
      (resp:any)=>{
        this.spinnerService.hide();
        console.log('resp',resp);
        this.step = 1
        this.auction = null;
        this.loadPage(this.page);
      }
    ).catch(
      (error:any)=>{
        this.spinnerService.hide();
        console.log('resp',error);
        this.setError('Ha ocurrido un error. No es posible actualizar el remate.')
      }
    );
  }

  /**
* load page de loans
* @param page 
*/
  loadPage(page: number) {
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.auctionService.loadAuctionByUser(this.status, this.order, '@', page, environment.paginator.per_page).then((response: PaginationResponse) => {
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
  setOrder(order: number) {
    this.order = order;
    this.loadPage(1);
  }

  /**
* set status 
* @param status 
*/
  setStatus(status: number) {
    //this.filter = '';
    this.status = status;
    this.loadPage(1);
  }

  onDateSelection(date: NgbDate) {
    /*if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else*/ 
    if (this.fromDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    }else if(this.fromDate && date && date.equals(this.fromDate)){  
      this.toDate = this.fromDate;
    } else {
      this.toDate = null;
      //this.fromDate = date;
    }
    let inputDurationElem:HTMLInputElement = this.inputDuration.nativeElement;
    const startDay =  this.fromDate.day;
    const endDay = this.toDate.day;
    this.auction.duration = endDay - startDay;
    inputDurationElem.value = String(endDay - startDay);
  }
  
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

}
