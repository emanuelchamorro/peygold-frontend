import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pey-success',
  templateUrl: './pey-success.component.html',
  styleUrls: ['./pey-success.component.scss']
})
export class PeySuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (!navigation || !navigation.extras.state || !navigation.extras.state.successSignUp) {
      this.router.navigateByUrl('/');
    }
  }

  private title: string;
  private message: string;

  /**
   * On init implementation
   */
  ngOnInit() {


    this.title = this.route.snapshot.data[`title`];
    this.message = this.route.snapshot.data[`message`];
  }

}
