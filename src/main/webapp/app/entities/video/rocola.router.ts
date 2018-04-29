import { Route } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiTrackerService, Principal } from '../../shared';
import { RocolaComponent } from './rocola.component';

export const rocolaRoute: Route = {
    path: 'rocola-youtube',
    component: RocolaComponent,
    data: {
    }
};
