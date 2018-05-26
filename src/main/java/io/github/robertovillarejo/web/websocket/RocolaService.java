package io.github.robertovillarejo.web.websocket;

import java.util.List;

import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import io.github.robertovillarejo.domain.Video;
import io.github.robertovillarejo.service.VideoService;

@Controller
public class RocolaService {

    private VideoService videoService;

    public RocolaService(VideoService videoService) {
        this.videoService = videoService;
    }

    @SubscribeMapping("/topic/video")
    @SendTo("/topic/playlist")
    public List<Video> addVideo(@Payload Video video) {
        videoService.save(video);
        return videoService.findAll();
    }

}