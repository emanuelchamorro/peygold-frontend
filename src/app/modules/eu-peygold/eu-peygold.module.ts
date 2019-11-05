import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EuPeyGoldRouting} from './eu-peygold.routing';
import {CommonsPeyGoldModule} from '../commons-peygold/commons-peygold.module';
import { EuPeyHomeComponent } from './components/eu-pey-home/eu-pey-home.component';

@NgModule({
  declarations: [
    EuPeyHomeComponent,
  ],
  imports: [
    CommonModule,
    CommonsPeyGoldModule,
    EuPeyGoldRouting
  ]
})
export class EuPeyGoldModule { }
