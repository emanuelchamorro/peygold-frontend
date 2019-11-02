import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScPeyGoldRouting} from './sc-peygold.routing';
import { ScPeyDashboardComponent } from './components/sc-pey-dashboard/sc-pey-dashboard.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ScPeyUsersComponent } from './components/sc-pey-users/sc-pey-users.component';
import { ScPeyShowUserComponent } from './components/sc-pey-show-user/sc-pey-show-user.component';
import { ScPeyStoreUserComponent } from './components/sc-pey-store-user/sc-pey-store-user.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';

@NgModule({
  declarations: [
    ScPeyDashboardComponent,
    ScPeyUsersComponent,
    ScPeyShowUserComponent,
    ScPeyStoreUserComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    CommonModule,
    CommonsPeyGoldModule,
    ScPeyGoldRouting,
  ]
})
export class ScPeyGoldModule { }
