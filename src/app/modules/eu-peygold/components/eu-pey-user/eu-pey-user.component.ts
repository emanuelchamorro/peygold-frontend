import { Component, OnInit } from '@angular/core';
import {BaseComponent} from '../base.component';
import {AuthService} from '../../../auth-peygold/services/auth.service';

@Component({
  selector: 'app-eu-pey-user',
  templateUrl: './eu-pey-user.component.html',
  styleUrls: ['./eu-pey-user.component.scss']
})
export class EuPeyUserComponent extends BaseComponent implements OnInit {


  constructor(
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
  }

}
