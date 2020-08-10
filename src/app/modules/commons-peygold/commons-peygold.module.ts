import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {UIPeyMainMenuComponent} from './layout/ui-pey-main-menu/ui-pey-main-menu.component';
import {UIPeyLayoutComponent} from './layout/ui-pey-layout/ui-pey-layout.component';
import {UIPeyCardLayoutComponent} from './layout/ui-pey-layout-card/ui-pey-layout-card.component';
import {UIPeyLayoutDashboardComponent} from './layout/ui-pey-layout-dashboard/ui-pey-layout-dashboard.component';
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
import { UiPePeyLayoutComponent } from './layout/ui-pe-pey-layout/ui-pe-pey-layout.component';
import { UiPePeyLayoutQrComponent } from './layout/ui-pe-pey-layout-qr/ui-pe-pey-layout-qr.component';
import { UiPeyMessageSuccessComponent } from './components/ui-pey-message-success/ui-pey-message-success.component';
import { UiPeyMessageSuccessModalComponent } from './components/ui-pey-message-success-modal/ui-pey-message-success-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UiPeyHelpLayoutComponent } from './layout/ui-pey-help-layout/ui-pey-help-layout.component';
import { UiPeyVerifySecurityCodeComponent } from './components/ui-pey-verify-security-code/ui-pey-verify-security-code.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { UiPeyNotificationsComponent } from './components/ui-pey-notifications/ui-pey-notifications.component';
import { UiPeyBarNotificationsComponent } from './components/ui-pey-bar-notifications/ui-pey-bar-notifications.component';
import { UiPeySingleMapComponent } from './components/ui-pey-single-map/ui-pey-single-map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { environment } from '../../../environments/environment';





@NgModule({
  declarations: [
    UIPeyMainMenuComponent,
    UIPeyLayoutComponent,
    UIPeyLayoutDashboardComponent,
    UIPeyCardLayoutComponent,
    UIPeySidebarComponent,
    OnlyNumbersDirective,
    UIPeyFeedbackMessageComponent,
    UIPeyUserAutocompleteComponent,
    UIPeyMoneyTransactionFormComponent,
    UIPeyUserImageComponent,
    UIPeyUserFormComponent,
    UIPeyAddressFormComponent,
    UiPePeyLayoutComponent,
    UiPePeyLayoutQrComponent,
    UiPeyMessageSuccessComponent,
    UiPeyMessageSuccessModalComponent,
    UiPeyHelpLayoutComponent,
    UiPeyVerifySecurityCodeComponent,
    UiPeyNotificationsComponent,
    UiPeyBarNotificationsComponent,
    UiPeySingleMapComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AutocompleteLibModule,
    NgxSpinnerModule,
    NgbAlertModule,
    NgxMaskModule.forRoot(NgMaskConfig),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      },
    }),
    AgmCoreModule.forRoot({
      apiKey: environment.google_map_key
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
    UiPeyMessageSuccessComponent,
    UiPeyVerifySecurityCodeComponent,
    UiPeyMessageSuccessModalComponent,
    UiPeyNotificationsComponent,
    UiPeySingleMapComponent
 
  ],
  providers: [ 
    GoogleMapsAPIWrapper]
})
export class CommonsPeyGoldModule { }
