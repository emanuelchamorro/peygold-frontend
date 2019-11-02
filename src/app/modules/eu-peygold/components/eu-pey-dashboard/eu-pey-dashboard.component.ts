import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-eu-pey-dashboard',
  templateUrl: './eu-pey-dashboard.component.html',
  styleUrls: ['./eu-pey-dashboard.component.scss']
})
export class EuPeyDashboardComponent extends BaseComponent implements OnInit {
  /**
   * On init implementation
   */
  ngOnInit() {
    alert('entro');

  }
}
