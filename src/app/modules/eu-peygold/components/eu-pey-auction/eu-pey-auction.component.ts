import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { Auction } from '../../../../models/auction';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { AuctionsService } from '../../services/auctions.service';
import { PaginationResponse } from '../../../commons-peygold/entities/pagination-response';
import { InMemoryService } from '../../../../services/in-memory.service';

@Component({
  selector: 'app-eu-pey-auction',
  templateUrl: './eu-pey-auction.component.html',
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
export class EuPeyAuctionComponent extends BaseComponent implements OnInit {


  @ViewChild('datepicker', { static: false, read: ElementRef }) private inputDuration: ElementRef;

  public auction: Auction;
  public step: number = 1;

  private title: string;
  private message: string;
  private showImageBottom: boolean;
  private sendType: number;
  private routeTo: string;
  private buttonLabel: string;

  //
  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  maxDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  private peygoldCreditsToAuction: PaginationResponse;

  public totalItems: number;
  public page: number;
  public previousPage: number;
  public showPagination: boolean;

  public year: number = 0;
  public month: number = 0;
  public sortAmount: number = 0;

  constructor(
    private calendar: NgbCalendar,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private auctionService: AuctionsService,
    private inMemoryService: InMemoryService) {

    super();
  }

  ngOnInit() {

    this.spinnerService.show();
    this.userService.searchPeygoldsCredits(this.year, this.month, this.sortAmount, 1, environment.paginator.per_page).then(
      (response: PaginationResponse) => {
        this.peygoldCreditsToAuction = response;

        if (this.peygoldCreditsToAuction.data.length > 0) {
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
      }
    ).catch(
      (error: any) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
      });


  }

  /**
   * select peygold credit to auction
   * @param peygoldcredit 
   */
  selectPeygoldCredit(peygoldcredit: Auction) {
    this.auction = peygoldcredit;
    this.auction.transaction.createdAt = new Date();
    let expirationDatePeygoldsCredit = this.auction.expirationDate;
    this.minDate = this.calendar.getToday();
    this.maxDate = new NgbDate(expirationDatePeygoldsCredit.getFullYear(), expirationDatePeygoldsCredit.getMonth() + 1, expirationDatePeygoldsCredit.getDate());
    this.fromDate = this.minDate;
  }

  continue() {
    if (this.auction) {
      this.step++;
    } else {
      this.setError('Seleccione un peygold crédito.');
    }
  }

  saveAuction() {
    this.spinnerService.show();
    this.auctionService.createAuction(this.auction).then(
      (resp: any) => {
        this.spinnerService.hide();
        console.log('resp', resp);
        this.title = "¡Remataste peygolds créditos!";
        this.message = "Colocaste tus peygolds créditos exitosamente";
        this.showImageBottom = false;
        this.buttonLabel = "Ver mis remates";
        this.routeTo = this.routes.myauctions.index.href;
        this.step++;
      }
    ).catch(
      (error: any) => {
        this.spinnerService.hide();
        console.log('resp', error);
      }
    )
  }

  onDateSelection(date: NgbDate) {

    if (this.fromDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else if (this.fromDate && date && date.equals(this.fromDate)) {
      this.toDate = this.fromDate;
    } else {
      this.toDate = null;
      //this.fromDate = date;
    }
    let inputDurationElem: HTMLInputElement = this.inputDuration.nativeElement;
    const startDay = this.fromDate.day;
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


  /**
* load page de loans
* @param page 
*/
  loadPage(page: number) {
    this.previousPage = page - 1;
    this.spinnerService.show();
    this.userService.searchPeygoldsCredits(this.year, this.month, this.sortAmount, page, environment.paginator.per_page).then(
      (response: PaginationResponse) => {
        this.peygoldCreditsToAuction = response;

        if (this.peygoldCreditsToAuction.data.length > 0) {
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
      }
    ).catch(
      (error: any) => {
        this.page = 1;
        this.previousPage = 1;
        this.totalItems = 0;
        this.showPagination = false;
        this.spinnerService.hide();
      });

  }

  /**
  * set order 
  * @param order 
  */
  setOrder(order: number) {
    this.sortAmount = order;
    this.loadPage(1);
  }

  /**
 * set order 
 * @param order 
 */
  setYear(year: number) {
    this.year = year;
    this.loadPage(1);
  }

  /**
* set order 
* @param order 
*/
  setMonth(month: string) {
    this.month = parseInt(month);
    this.loadPage(1);
  }

}
