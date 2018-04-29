package io.github.robertovillarejo.web.websocket;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import io.github.robertovillarejo.domain.Video;

@Controller
public class RocolaService {
    
    private static final Logger log = LoggerFactory.getLogger(RocolaService.class);
    private List<Video> playlist = new ArrayList<>();

    @SubscribeMapping("/topic/video")
    @SendTo("/topic/playlist")
    public List<Video> sendActivity(@Payload Video video) {
        log.debug("request to SAVE VIDEO", video);
        playlist.add(video);
        return playlist;
    }

}
