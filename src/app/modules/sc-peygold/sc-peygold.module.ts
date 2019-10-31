import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScPeyGoldRouting} from './sc-peygold.routing';
import { ScPeyDashboardComponent } from './components/sc-pey-dashboard/sc-pey-dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ScPeyLayoutComponent } from './layout/sc-pey-layout/sc-pey-layout.component';
import { ScPeyUsersComponent } from './components/sc-pey-users/sc-pey-users.component';
import { ScPeyShowUserComponent } from './components/sc-pey-show-user/sc-pey-show-user.component';
import { ScPeyStoreUserComponent } from './components/sc-pey-store-user/sc-pey-store-user.component';
import { ScPeySidebarComponent } from './layout/sc-pey-sidebar/sc-pey-sidebar.component';

@NgModule({
  declarations: [
    ScPeyDashboardComponent,
    ScPeyLayoutComponent,
    ScPeyUsersComponent,
    ScPeyShowUserComponent,
    ScPeyStoreUserComponent,
    ScPeySidebarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ScPeyGoldRouting,
  ]
})
export class ScPeyGoldModule { }
