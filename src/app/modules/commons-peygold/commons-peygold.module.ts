import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { UIPeyMainMenuComponent } from './layout/ui-pey-main-menu/ui-pey-main-menu.component';
import {UIPeyLayoutComponent} from './layout/ui-pey-layout/ui-pey-layout.component';
import {UIPeySidebarComponent} from './layout/ui-pey-sidebar/ui-pey-sidebar.component';

@NgModule({
  declarations: [
    UIPeyMainMenuComponent,
    UIPeyLayoutComponent,
    UIPeySidebarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
  ],
  exports: [
    UIPeySidebarComponent
  ]
})
export class CommonsPeyGoldModule { }
