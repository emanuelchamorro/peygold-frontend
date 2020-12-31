import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-peygold-questions',
  templateUrl: './peygold-questions.component.html',
  styleUrls: ['./peygold-questions.component.scss']
})
export class PeygoldQuestionsComponent extends BaseComponent implements OnInit {

  public contentId:number;

  constructor(private route:ActivatedRoute) { 
    super();
    this.contentId = Number(this.route.snapshot.paramMap.get('contentId'));
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.contentId = routeParams.contentId;
    });
  }

}
