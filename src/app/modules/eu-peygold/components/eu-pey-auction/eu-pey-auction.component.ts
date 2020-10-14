import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';
import { Auction } from '../../../../models/auction';

@Component({
  selector: 'app-eu-pey-auction',
  templateUrl: './eu-pey-auction.component.html',
  styleUrls: ['./eu-pey-auction.component.scss']
})
export class EuPeyAuctionComponent  extends BaseComponent implements OnInit {

  public auction:Auction;
  public step: number=1;

  private title:string;
  private message:string;
  private showImageBottom:boolean;
  private sendType:number;
  private routeTo: string;
  private buttonLabel:string;

  private peygoldCreditsToAuction: Array<Auction>;

  constructor(
    private spinnerService: NgxSpinnerService,
    private userService: UserService) { 
      super();
    }

  ngOnInit() {

   // this.spinnerService.show();
   this.peygoldCreditsToAuction = this.userService.loadPeygoldsCredits();


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
    this.step++;
  }

  saveAuction(){
    this.title = "¡Remataste peygolds créditos!";
    this.message = "Colocaste tus peygolds créditos exitosamente";
    this.showImageBottom = false;
    this.buttonLabel = "Ver mis remates";
    this.routeTo = this.routes.myauctions.index.href;
    this.step++;
  }

}
