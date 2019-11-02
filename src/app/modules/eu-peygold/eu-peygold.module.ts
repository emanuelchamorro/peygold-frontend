import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EuPeyDashboardComponent} from './components/eu-pey-dashboard/eu-pey-dashboard.component';
import {EuPeyGoldRouting} from './eu-peygold.routing';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';

@NgModule({
  declarations: [
    EuPeyDashboardComponent,
  ],
  imports: [
    CommonModule,
    CommonsPeyGoldModule,
    EuPeyGoldRouting
  ]
})
export class EuPeyGoldModule { }
