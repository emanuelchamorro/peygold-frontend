import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { Auction } from '../../../../models/auction';
import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../../../environments/environment';
import { AuctionsService } from '../../services/auctions.service';

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
export class EuPeyAuctionComponent  extends BaseComponent implements OnInit {


  @ViewChild('datepicker',{static:false, read: ElementRef }) private inputDuration: ElementRef;

  public auction:Auction;
  public step: number=1;

  private title:string;
  private message:string;
  private showImageBottom:boolean;
  private sendType:number;
  private routeTo: string;
  private buttonLabel:string;

  //
  hoveredDate: NgbDate | null = null;
  minDate: NgbDate;
  maxDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  private peygoldCreditsToAuction: Array<Auction>;

  constructor(
    calendar: NgbCalendar,
    private spinnerService: NgxSpinnerService,
    private userService: UserService,
    private auctionService: AuctionsService) { 
      
      super();
      let today = new Date();
      let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
      this.minDate = calendar.getToday();
      this.maxDate = calendar.getNext(calendar.getToday(), 'd', lastDayOfMonth.getDate());
      this.fromDate = this.minDate;

    }

  ngOnInit() {

   this.spinnerService.show();
   this.userService.searchPeygoldsCredits(1, environment.paginator.per_page).then(
     (response: Array<Auction>)=>{
      this.spinnerService.hide();
      this.peygoldCreditsToAuction = response;
     }
   ).catch(
     (error:any)=>{
      this.spinnerService.hide();
      this.setError('Ha ocurrido un error. No es posible visualizar el resumen de peygolds creditos.');
     });


  }

  /**
   * select peygold credit to auction
   * @param peygoldcredit 
   */
  selectPeygoldCredit(peygoldcredit: Auction){
    this.auction = peygoldcredit;
    this.auction.transaction.createdAt = new Date();
  }

  continue(){
    if(this.auction){
      this.step++;
    }else{
      this.setError('Seleccione un peygold crédito.');
    }    
  }

  saveAuction(){
    this.spinnerService.show();
    this.auctionService.createAuction(this.auction).then(
      (resp:any)=>{
        this.spinnerService.hide();
        console.log('resp',resp);
        this.title = "¡Remataste peygolds créditos!";
        this.message = "Colocaste tus peygolds créditos exitosamente";
        this.showImageBottom = false;
        this.buttonLabel = "Ver mis remates";
        this.routeTo = this.routes.myauctions.index.href;
        this.step++;
      }
    ).catch(
      (error:any)=>{
        this.spinnerService.hide();
        console.log('resp',error);
      }
    )
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
