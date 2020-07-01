import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../components/base.component';

@Component({
  selector: 'app-pey-success',
  templateUrl: './pey-success.component.html',
  styleUrls: ['./pey-success.component.scss']
})
export class PeySuccessComponent extends BaseComponent implements OnInit {

  private title:string;
  private message:string;
  private showImageBottom:boolean;
  private routeTo: string;
  private buttonLabel:string;

  constructor(
    private route: ActivatedRoute,
    protected router: Router
  ) {
    super();
    const navigation = this.router.getCurrentNavigation();
    if (!navigation || !navigation.extras.state || !navigation.extras.state.securedRedirection) {
      this.router.navigateByUrl(this.routes.home.href);
    }
  }

  /**
   * On init implementation
   */
  ngOnInit() {
    this.title = this.route.snapshot.data[`title`];
    this.message = this.route.snapshot.data[`message`];
    this.showImageBottom = true;
    this.buttonLabel = "Iniciar sesión";
    this.routeTo = this.routes.login.href;
  }

}
