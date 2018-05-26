package io.github.robertovillarejo.web.websocket;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import io.github.robertovillarejo.domain.Video;
import io.github.robertovillarejo.service.VideoService;

@Controller
public class RocolaService implements ApplicationListener<SessionConnectedEvent> {

    private static final Logger log = LoggerFactory.getLogger(RocolaService.class);

    private VideoService videoService;
    
    private final SimpMessageSendingOperations messagingTemplate;

    public RocolaService(VideoService videoService,SimpMessageSendingOperations messagingTemplate) {
        this.videoService = videoService;
        this.messagingTemplate = messagingTemplate;
    }

    @SubscribeMapping("/topic/video")
    @SendTo("/topic/playlist")
    public List<Video> addVideo(@Payload Video video) {
        videoService.save(video);
        log.debug("Saving video {}", video);
        return videoService.findAll();
    }

    @Override
    public void onApplicationEvent(SessionConnectedEvent event) {
        messagingTemplate.convertAndSend("/topic/playlist", videoService.findAll());
    }

}