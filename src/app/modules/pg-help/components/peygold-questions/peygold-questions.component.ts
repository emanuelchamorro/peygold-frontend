import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-peygold-questions',
  templateUrl: './peygold-questions.component.html',
  styleUrls: ['./peygold-questions.component.scss']
})
export class PeygoldQuestionsComponent extends BaseComponent implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}
