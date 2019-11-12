import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AppComponent } from './app.component';
import { AuthPeyGoldModule } from './modules/auth-peygold/auth-peygold.module';
import {HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import {HttpErrorInterceptor} from './modules/commons-peygold/interceptors/http-error.interceptor';
import {ScPeyGoldModule} from './modules/sc-peygold/sc-peygold.module';
import {JwtInterceptor, JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {EuPeyGoldModule} from './modules/eu-peygold/eu-peygold.module';
import {CommonsPeyGoldModule} from './modules/commons-peygold/commons-peygold.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthPeyGoldModule,
    CommonsPeyGoldModule,
    ScPeyGoldModule,
    EuPeyGoldModule,
    OAuthModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
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
    })
  ],
  providers: [
    { provide: LocationStrategy,  useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
