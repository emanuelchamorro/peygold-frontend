import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Auction } from '../../../../models/auction';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-eu-pey-myauctions',
  templateUrl: './eu-pey-myauctions.component.html',
  styleUrls: ['./eu-pey-myauctions.component.scss']
})
export class EuPeyMyauctionsComponent implements OnInit {


  public auction:Auction;
  public step: number=1;

  private peygoldCreditsInAuction: Array<Auction>;

  constructor(private spinnerService: NgxSpinnerService,
    private userService: UserService) { }

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
    this.step++;
  }

  saveAuction(){

    this.step = 1
    this.auction = null;
  }

}
