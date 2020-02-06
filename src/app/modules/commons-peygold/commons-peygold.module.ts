import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {UIPeyMainMenuComponent} from './layout/ui-pey-main-menu/ui-pey-main-menu.component';
import {UIPeyLayoutComponent} from './layout/ui-pey-layout/ui-pey-layout.component';
import {UIPeySidebarComponent} from './layout/ui-pey-sidebar/ui-pey-sidebar.component';
import {OnlyNumbersDirective} from './directives/only-numbers.directive';
import {UIPeyFeedbackMessageComponent} from './layout/ui-pey-feedback-message/ui-pey-feedback-message.component';
import {UIPeyUserAutocompleteComponent} from './components/ui-pey-user-autocomplete/ui-pey-user-autocomplete.component';
import {UIPeyMoneyTransactionFormComponent} from './components/ui-pey-money-transaction-form/ui-pey-money-transaction-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {NgMaskConfig} from '../../config';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {NgSelectModule} from '@ng-select/ng-select';
import { UIPeyUserImageComponent } from './components/ui-pey-user-image/ui-pey-user-image.component';
import { UIPeyUserFormComponent } from './components/ui-pey-user-form/ui-pey-user-form.component';
import { UIPeyAddressFormComponent } from './components/ui-pey-address-form/ui-pey-address-form.component';



@NgModule({
  declarations: [
    UIPeyMainMenuComponent,
    UIPeyLayoutComponent,
    UIPeySidebarComponent,
    OnlyNumbersDirective,
    UIPeyFeedbackMessageComponent,
    UIPeyUserAutocompleteComponent,
    UIPeyMoneyTransactionFormComponent,
    UIPeyUserImageComponent,
    UIPeyUserFormComponent,
    UIPeyAddressFormComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AutocompleteLibModule,
    NgxMaskModule.forRoot(NgMaskConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      },
    })
  ],
  exports: [
    OnlyNumbersDirective,
    UIPeySidebarComponent,
    UIPeyFeedbackMessageComponent,
    UIPeyMoneyTransactionFormComponent,
    UIPeyUserImageComponent,
    UIPeyUserFormComponent,
    UIPeyAddressFormComponent,
 
  ]
})
export class CommonsPeyGoldModule { }
