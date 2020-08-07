import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-ui-pey-message-success',
  templateUrl: './ui-pey-message-success.component.html',
  styleUrls: ['./ui-pey-message-success.component.scss']
})
export class UiPeyMessageSuccessComponent implements OnInit {

  @Input() public title:string;
  @Input() public message:string;
  @Input() public showImageBottom:boolean;
  @Input() public routeTo:string;
  @Input() public buttonLabel:string;
  @Input() public classTop:string;
  @Output()
  public onContinue: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  continue():void{
    this.onContinue.emit({result:true});
  }

}
