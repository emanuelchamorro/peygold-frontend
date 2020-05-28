import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeyLoginComponent } from './components/pey-login/pey-login.component';
import { AuthPeyGoldRouting } from './auth-peygold.routing';
import { PeyRegisterComponent } from './components/pey-register/pey-register.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PeySuccessComponent } from './components/pey-success/pey-success.component';
import { PeyResetPasswordComponent } from './components/pey-reset-password/pey-reset-password.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MustMatchDirective } from './directive/must-match.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PeyVerifyEmailComponent } from './components/pey-verify-email/pey-verify-email.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgMaskConfig } from 'src/app/config';


@NgModule({
  declarations: [
    PeyLoginComponent,
    PeyRegisterComponent,
    PeySuccessComponent,
    PeyResetPasswordComponent,
    MustMatchDirective,
    PeyVerifyEmailComponent],
  imports: [
    CommonModule,
    AuthPeyGoldRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbAlertModule,
    NgxSpinnerModule,
    NgxMaskModule.forRoot(NgMaskConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ]
})
export class AuthPeyGoldModule { }
