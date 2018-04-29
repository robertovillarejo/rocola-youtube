import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RocolaYoutubeSharedModule } from '../../shared';
import {
    VideoService,
    VideoPopupService,
    VideoComponent,
    VideoDetailComponent,
    VideoDialogComponent,
    VideoPopupComponent,
    VideoDeletePopupComponent,
    VideoDeleteDialogComponent,
    videoRoute,
    videoPopupRoute,
    rocolaRoute,
    RocolaComponent,
    RocolaService
} from './';

const ENTITY_STATES = [
    ...videoRoute,
    ...videoPopupRoute,
    rocolaRoute
];

@NgModule({
    imports: [
        RocolaYoutubeSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VideoComponent,
        VideoDetailComponent,
        VideoDialogComponent,
        VideoDeleteDialogComponent,
        VideoPopupComponent,
        VideoDeletePopupComponent,
        RocolaComponent
    ],
    entryComponents: [
        VideoComponent,
        VideoDialogComponent,
        VideoPopupComponent,
        VideoDeleteDialogComponent,
        VideoDeletePopupComponent,
        RocolaComponent
    ],
    providers: [
        VideoService,
        VideoPopupService,
        RocolaService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RocolaYoutubeVideoModule {}
