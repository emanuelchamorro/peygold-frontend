import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-pey-message-success',
  templateUrl: './ui-pey-message-success.component.html',
  styleUrls: ['./ui-pey-message-success.component.scss']
})
export class UiPeyMessageSuccessComponent implements OnInit {

  @Input() public title:string;
  @Input() public message:string;
  @Input() public routeTo:string;
  @Input() public buttonLabel:string;

  constructor() { }

  ngOnInit() {
  }

}
