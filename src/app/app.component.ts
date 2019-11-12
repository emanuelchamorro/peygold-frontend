import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-peygold';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(environment.i18n.language);
    this.translate.use(environment.i18n.country);
  }
}
