package io.github.robertovillarejo.web.websocket;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import io.github.robertovillarejo.domain.Video;
import io.github.robertovillarejo.repository.VideoRepository;

@Controller
public class RocolaService {

    private static final Logger log = LoggerFactory.getLogger(RocolaService.class);
    private VideoRepository videoRepository;

    public RocolaService(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @SubscribeMapping("/topic/video")
    @SendTo("/topic/playlist")
    public List<Video> sendActivity(@Payload Video video) {
        log.debug("WS request to save video", video.toString());
        videoRepository.save(video);
        return videoRepository.findAll();
    }

}
