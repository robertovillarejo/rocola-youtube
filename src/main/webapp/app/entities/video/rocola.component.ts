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

    videos: any[] = [];

    video = new Video();

    constructor(
        private rocolaService: RocolaService
    ) {
        rocolaService.connect();
    }

    save() {
        console.log('SAVE COMPONENT');
        this.isSaving = true;
        this.rocolaService.sendVideo(this.video);
    }

    ngOnInit() {
        this.rocolaService.subscribe();
        this.rocolaService.receive().subscribe((videos) => {
            console.log(videos);
            this.videos = videos;
        });
    }

    ngOnDestroy() {
        this.rocolaService.unsubscribe();
    }
}
