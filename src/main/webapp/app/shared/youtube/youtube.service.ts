import { OnDestroy } from "@angular/core";
import { Http } from "@angular/http";

export class YoutubeService {

    private http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    search(query: String): any {
        return this.http.get('https://www.googleapis.com/youtube/v3/search', {
            params:
                {
                    key: 'AIzaSyD8839x5fpTHddEocyJZKsbUihKT_S5QeA',
                    part: 'snippet',
                    q: query,
                    maxResults: 30,
                    videoEmbeddable: 'true',
                    type: 'video',
                    videoCategoryId: '10',
                    videoDuration: 'short',
                    safeSearch: 'moderate',
                    topicId: '10'
                }
        });
    }
}