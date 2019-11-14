import {routes} from './routes';
import {Routes} from '@angular/router';
import {UIPeyFeedbackMessageComponent} from './layout/ui-pey-feedback-message/ui-pey-feedback-message.component';

export const config: Routes = [
  {
    path: routes.feedback.route,
    component: UIPeyFeedbackMessageComponent,
  },
  // { path: '**', component: P404Component }
];

export class CommonsPeyGoldRouting {}
