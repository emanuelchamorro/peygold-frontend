import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-pey-verify-email',
  templateUrl: './pey-verify-email.component.html',
  styleUrls: ['./pey-verify-email.component.scss']
})
export class PeyVerifyEmailComponent extends BaseComponent implements OnInit {

  params:string;
  result:boolean;

  constructor(
    private authService:AuthService,
    private route: Router,
    private spinnerService:NgxSpinnerService) { 
      super();
     this.params = this.route.url.split('?')[1];
     console.log('url',this.route.url)

  }

  ngOnInit() {
   this.spinnerService.show();
    const params = `?${this.params}`;
    this.authService.verifyEmail(params).then(
      (resp)=>{
        this.spinnerService.hide();
        this.result = resp;
        if(resp){
          console.log('controlador',resp);
        }else{
          console.log('controlador',resp);
        }
        
      }
    );
  }


}
