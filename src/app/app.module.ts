import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule, APP_INITIALIZER} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { AuthPeyGoldModule } from './modules/auth-peygold/auth-peygold.module';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpErrorInterceptor} from './modules/commons-peygold/interceptors/http-error.interceptor';
import {ScPeyGoldModule} from './modules/sc-peygold/sc-peygold.module';
import {JwtInterceptor, JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import {EuPeyGoldModule} from './modules/eu-peygold/eu-peygold.module';
import {CommonsPeyGoldModule} from './modules/commons-peygold/commons-peygold.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import localeEsAR from '@angular/common/locales/es-AR';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from './util/ngb-date-fr-Parser-Formatter';
import { LocationService } from './services/location.service';
import { BanksService } from './services/banks.service';
import { PePeygoldModule } from './modules/pe-peygold/pe-peygold.module';
import { PgHelpModule } from './modules/pg-help/pg-help.module';



registerLocaleData(localeEsAR, 'es-AR');

export function countriesProviderFactory(
  locationService:LocationService){
  return () =>locationService.getCountries();
}

export function bankProviderFactory(
  banksService:BanksService){
  return () =>  banksService.getBanks();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthPeyGoldModule,
    CommonsPeyGoldModule,
    ScPeyGoldModule,
    EuPeyGoldModule,
    PePeygoldModule,
    OAuthModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
         /* return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkb3VnbGFzdHJlam9zQGhvdG1haWwuY29tIiw' +
            'ianRpIjoiY2JhZjVmMzgtZDQ4ZC00MjMwLTgyNTItNmQwNWE4NDhjMjY1IiwiUm9sZSI6IkNvbW1lcmNlIiwi' +
            'QXNwTmV0VXNlcklkIjoiMjgwNGNjMDEtMzhkYi00Y2M2LWExY2MtOGRjMWRiMjJmODdlIiwiVXNlcklkIjo' +
            'iMjY2IiwibmJmIjoxNTcwNTMxNzc4LCJleHAiOjE1NzU3MTU3NzgsImlzcyI6ImtpcGEudHJvc2tpIiwiYXVkIj' +
            'oicm9tZSJ9.sAWuQs4fEnowrs9WYIzvjmkyCyyAdG2L9vWUWWp-L0w';*/
           return localStorage.getItem(environment.localStorage.access_token_var_name);
        },
        whitelistedDomains: environment.interceptors.jwt_interceptor.white_list
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      },
    }),
    PgHelpModule
  ],
  providers: [
    { provide: LocationStrategy,  useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter},
    LocationService,    
    { provide: APP_INITIALIZER, useFactory: countriesProviderFactory, deps: [LocationService], multi: true },
    BanksService,
    { provide: APP_INITIALIZER, useFactory: bankProviderFactory, deps: [BanksService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
