import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../components/base-component.component';
import {Message} from '../../entities/message';

@Component({
  selector: 'app-ui-pey-feedback-message',
  templateUrl: './ui-pey-feedback-message.component.html',
  styleUrls: ['./ui-pey-feedback-message.component.scss']
})
export class UIPeyFeedbackMessageComponent extends BaseComponent implements OnInit {

  private message: Message;

  constructor(
    private route: ActivatedRoute,
    protected router: Router
  ) {
    super();

    const navigation = this.router.getCurrentNavigation();
    if (!navigation || !navigation.extras.state || !navigation.extras.state.securedRedirection) {
      this.router.navigateByUrl(this.home || '/');
    }
    this.message = navigation.extras.state.message;
  }

  ngOnInit() {

  }

}
