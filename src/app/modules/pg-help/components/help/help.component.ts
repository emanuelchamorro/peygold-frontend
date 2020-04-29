import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent extends BaseComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
