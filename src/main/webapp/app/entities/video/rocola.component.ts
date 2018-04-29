import { Component, OnInit, OnDestroy } from '@angular/core';

import { JhiTrackerService } from '../../shared';
import { RocolaService } from './rocola.service';
import { Video } from '.';

@Component({
    selector: 'jhi-rocola',
    templateUrl: './rocola.component.html'
})
export class RocolaComponent implements OnInit, OnDestroy {

    private isSaving = false;

    videos: any[] = [{
        id: '1234',
        title: 'TITULO',
        description: 'description'
    }];

    constructor(
        private rocolaService: RocolaService
    ) {
        rocolaService.connect();
    }

    save() {
        console.log('SAVE COMPONENT');
        this.isSaving = true;
        this.rocolaService.sendVideo();
    }

    showVideos(video: any) {

    }

    ngOnInit() {
        this.rocolaService.subscribe();
        this.rocolaService.receive().subscribe((video) => {
            this.showVideos(video);
        });
    }

    ngOnDestroy() {
        this.rocolaService.unsubscribe();
    }
}
