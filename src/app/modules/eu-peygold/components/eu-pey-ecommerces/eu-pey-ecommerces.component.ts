import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eu-pey-ecommerces',
  templateUrl: './eu-pey-ecommerces.component.html',
  styleUrls: ['./eu-pey-ecommerces.component.scss']
})
export class EuPeyEcommercesComponent implements OnInit {


  protected addressMap: string = null;
  protected adress: string = null;
  protected cityName:string = 'Caracas';


  constructor() { }

  ngOnInit() {
  }


  setAddress(){
    this.addressMap = this.adress+' '+this.cityName;
  }

}
