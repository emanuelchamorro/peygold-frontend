import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseComponent} from '../../components/base-component.component';
import {Message} from '../../entities/message';

@Component({
  selector: 'app-ui-feedback-message',
  templateUrl: './ui-feedback-message.component.html',
  styleUrls: ['./ui-feedback-message.component.scss']
})
export class UIFeedbackMessageComponent extends BaseComponent implements OnInit {

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
