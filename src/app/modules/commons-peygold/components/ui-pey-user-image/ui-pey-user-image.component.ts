import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models';

@Component({
  selector: 'app-ui-pey-user-image',
  templateUrl: './ui-pey-user-image.component.html',
  styleUrls: ['./ui-pey-user-image.component.scss']
})
export class UIPeyUserImageComponent implements OnInit {

  @Input()
  public user: User;

  @Input()
  public size = 'md';

  constructor() { }

  ngOnInit() {
  }

}
