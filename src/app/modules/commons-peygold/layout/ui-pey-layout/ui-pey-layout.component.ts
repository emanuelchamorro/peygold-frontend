import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-pey-layout',
  templateUrl: './ui-pey-layout.component.html',
  styleUrls: ['./ui-pey-layout.component.scss']
})
export class UIPeyLayoutComponent implements OnInit {

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
