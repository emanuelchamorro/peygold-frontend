import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-ui-pey-message-success-modal',
  templateUrl: './ui-pey-message-success-modal.component.html',
  styleUrls: ['./ui-pey-message-success-modal.component.scss']
})
export class UiPeyMessageSuccessModalComponent implements OnInit {

  @Input() public title:string;
  @Input() public message:string;
  @Input() public showImageBottom:boolean;
  @Input() public routeTo:string;
  @Input() public buttonLabel:string;
  @Output()
  public onContinue: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  continue():void{
    this.onContinue.emit({result:true});
  }

}
