import { Component, OnInit } from '@angular/core';
import { PeySetting } from '../../../../models/pey-setting';


@Component({
  selector: 'app-sc-pey-settings',
  templateUrl: './sc-pey-settings.component.html',
  styleUrls: ['./sc-pey-settings.component.scss']
})
export class ScPeySettingsComponent implements OnInit {

  public peySetting: PeySetting;

  constructor() { }

  ngOnInit() {
    this.peySetting = new PeySetting();
  }

  onSubmit(){
    console.log('form settings is valid');
  }

}
