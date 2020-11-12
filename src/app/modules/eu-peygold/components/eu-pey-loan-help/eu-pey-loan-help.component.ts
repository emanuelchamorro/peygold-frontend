import { Component, OnInit, Input } from '@angular/core';
import { SelectOptionQuestion } from 'src/app/models/select-option-question';

@Component({
  selector: 'app-eu-pey-loan-help',
  templateUrl: './eu-pey-loan-help.component.html',
  styleUrls: ['./eu-pey-loan-help.component.scss']
})
export class EuPeyLoanHelpComponent implements OnInit {

  @Input() public optionQuestions: Array<SelectOptionQuestion>;

  toggleHelp1: boolean = false;
  toggleHelp2: boolean = false;


  constructor() { }

  ngOnInit() {
  }
  toggleContent(option: any) {

    this.toggleHelp2 = true
  }

}
