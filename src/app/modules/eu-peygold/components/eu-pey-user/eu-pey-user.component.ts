import { Component, OnInit, SimpleChanges } from '@angular/core';
import { BaseComponent } from '../base.component';
import { AuthService } from '../../../auth-peygold/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eu-pey-user',
  templateUrl: './eu-pey-user.component.html',
  styleUrls: ['./eu-pey-user.component.scss']
})
export class EuPeyUserComponent extends BaseComponent implements OnInit {

  public activeView: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.activeView = this.activatedRoute.snapshot.paramMap.get('activeView');
    console.log(this.activeView)
  }

  ngOnInit() {
  }


}
