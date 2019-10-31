import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../models';

@Component({
  selector: 'app-sc-pey-show-user',
  templateUrl: './sc-pey-show-user.component.html',
  styleUrls: ['./sc-pey-show-user.component.scss']
})
export class ScPeyShowUserComponent implements OnInit, OnDestroy {

  @Input() user: User;

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
