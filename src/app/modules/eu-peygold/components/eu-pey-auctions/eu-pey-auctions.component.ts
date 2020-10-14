import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Auction } from '../../../../models/auction';
import { UserService } from '../../services/user.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-eu-pey-auctions',
  templateUrl: './eu-pey-auctions.component.html',
  styleUrls: ['./eu-pey-auctions.component.scss']
})
export class EuPeyAuctionsComponent extends BaseComponent implements OnInit {

  public auction:Auction;
  public step: number=1;

  private peygoldCreditsInAuction: Array<Auction>;

  private title:string;
  private message:string;
  private showImageBottom:boolean;
  private sendType:number;
  private routeTo: string;
  private buttonLabel:string;

  constructor(private spinnerService: NgxSpinnerService,
    private userService: UserService) { 
      super();
    }

  ngOnInit() {
       // this.spinnerService.show();
   this.peygoldCreditsInAuction = this.userService.loadPeygoldsCreditsInAuction();
  }
    /**
   * select peygold credit in auction
   * @param auction 
   */
  selectPeygoldCredit(auction: Auction){
    this.auction = auction;

  }

  continue(){
    this.step++;
  }

  confirm(){
    this.title = "¡Compra exitosa!";
    this.message = `Los ${this.auction.transaction.type.coin} ${this.auction.transaction.amountToAuction} ya son tuyos. Tendras el importe disponible en tu billetera en la brevedad`;
    this.showImageBottom = false;
    this.buttonLabel = "Ir a remates";
    this.routeTo = this.routes.auctions.index.href;
    this.step++;
  }

}
