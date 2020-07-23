import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-pey-layout-card',
  templateUrl: './ui-pey-layout-card.component.html',
  styleUrls: ['./ui-pey-layout-card.component.scss']
})
export class UIPeyCardLayoutComponent implements OnInit {

  public thereAreNotifications:boolean;
  public display:boolean;

  constructor() { }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.thereAreNotifications = true;
  }

  displayNotifications():void{
    
    this.display = !this.display;

  }

}
