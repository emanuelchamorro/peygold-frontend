import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent extends BaseComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
