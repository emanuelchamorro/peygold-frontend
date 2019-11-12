import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { UIPeyMainMenuComponent } from './layout/ui-pey-main-menu/ui-pey-main-menu.component';
import {UIPeyLayoutComponent} from './layout/ui-pey-layout/ui-pey-layout.component';
import {UIPeySidebarComponent} from './layout/ui-pey-sidebar/ui-pey-sidebar.component';
import {OnlyNumbersDirective} from './directives/only-numbers.directive';
import { UIFeedbackMessageComponent } from './layout/ui-feedback-message/ui-feedback-message.component';

@NgModule({
  declarations: [
    UIPeyMainMenuComponent,
    UIPeyLayoutComponent,
    UIPeySidebarComponent,
    OnlyNumbersDirective,
    UIFeedbackMessageComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
  exports: [
    UIPeySidebarComponent,
    OnlyNumbersDirective,
    UIFeedbackMessageComponent,
  ]
})
export class CommonsPeyGoldModule { }
