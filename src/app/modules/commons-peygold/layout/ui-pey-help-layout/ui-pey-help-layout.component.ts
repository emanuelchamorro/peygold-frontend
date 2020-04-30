import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth-peygold/services/auth.service';
import {BaseComponent} from '../../components/base-component.component';
import {User} from '../../../../models';
import {routes as euRoutes} from '../../../eu-peygold/routes';

@Component({
  selector: 'app-ui-pey-help-layout',
  templateUrl: './ui-pey-help-layout.component.html',
  styleUrls: ['./ui-pey-help-layout.component.scss']
})
export class UiPeyHelpLayoutComponent extends BaseComponent implements OnInit {


  user: User;
  protected routes = euRoutes;

  constructor(private authService: AuthService) { 
    super();
    
  }

  ngOnInit() {
    this.authService.user$.subscribe((user: User) =>{
      this.user = user
      console.log('help user',this.user);
    } );
  }

}
