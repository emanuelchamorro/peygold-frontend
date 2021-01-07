import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ContactsusService } from '../../../../services/contactsus.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectOption, User } from 'src/app/models';
import { ContactUs } from '../../../../models/contact-us';
import { AuthService } from '../../../../modules/auth-peygold/services/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent extends BaseComponent implements OnInit {

  public subjects: Array<SelectOption>;
  public contactUs: ContactUs;
  public user: User;

  constructor(protected contactsusService:ContactsusService,
    protected spinnerService:NgxSpinnerService,
    protected authService: AuthService,) { 
    super();
  }

  ngOnInit() {
    this.user = this.authService.user();
    this.contactUs = new ContactUs();
    this.spinnerService.show();
    this.contactsusService.getSubjects().then(
      (resp:Array<SelectOption>)=>{
        this.subjects = resp;
        this.spinnerService.hide();
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No es posible cargar los posibles asuntos.')
      }
    );
  }

  sendSuggest(){
    this.spinnerService.show();
    this.contactsusService.sendSuggest(
      {
        Sender:this.user.email,
        Body:this.contactUs.bodyMessage,
        Subject: parseInt(this.contactUs.subject.id)
      }
    ).then(
      (resp)=>{
        this.spinnerService.hide();
        this.setSuccess('su sugerencia / inquietud fué enviada exitosamente.');
      }
    ).catch(
      (error)=>{
        this.spinnerService.hide();
        this.setError('Ha ocurrido un error. No fué posible enviar su sugerencia / inquietud');
      }
    )
  }

}
