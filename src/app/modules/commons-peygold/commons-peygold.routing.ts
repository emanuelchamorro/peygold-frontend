import {routes} from './routes';
import {Routes} from '@angular/router';
import {UIFeedbackMessageComponent} from './layout/ui-feedback-message/ui-feedback-message.component';

export const config: Routes = [
  {
    path: routes.feedback.route,
    component: UIFeedbackMessageComponent,
  },
  // { path: '**', component: P404Component }
];

export class CommonsPeyGoldRouting {}
