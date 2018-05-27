package io.github.robertovillarejo.service.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import io.github.robertovillarejo.domain.User;
import io.github.robertovillarejo.domain.Video;
import io.github.robertovillarejo.repository.CreditRepository;
import io.github.robertovillarejo.repository.UserRepository;
import io.github.robertovillarejo.repository.VideoRepository;
import io.github.robertovillarejo.security.SecurityUtils;
import io.github.robertovillarejo.service.VideoService;

/**
 * Service Implementation for managing Video.
 */
@Service
public class VideoServiceImpl implements VideoService {

    private final Logger log = LoggerFactory.getLogger(VideoServiceImpl.class);

    private final VideoRepository videoRepository;

    private final UserRepository userRepository;

    private final CreditRepository creditRepository;

    public VideoServiceImpl(VideoRepository videoRepository, UserRepository userRepository,
            CreditRepository creditRepository) {
        this.videoRepository = videoRepository;
        this.userRepository = userRepository;
        this.creditRepository = creditRepository;
    }

    /**
     * Save a video.
     *
     * @param video
     *            the entity to save
     * @return the persisted entity
     */
    @Override
    public Video save(Video video) {
        log.debug("Request to save Video : {}", video);
        Optional<String> currentUser = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(currentUser.get());
        video.setUser(user.get());
        return videoRepository.save(video);
    }

    /**
     * Get all the videos.
     *
     * @return the list of entities
     */
    @Override
    public List<Video> findAll() {
        log.debug("Request to get all Videos");
        Optional<String> currentUser = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(currentUser.get());
        return videoRepository.findAllByUser(user.get().getId());
    }

    /**
     * Get one video by id.
     *
     * @param id
     *            the id of the entity
     * @return the entity
     */
    @Override
    public Video findOne(String id) {
        log.debug("Request to get Video : {}", id);
        return videoRepository.findOne(id);
    }

    /**
     * Delete the video by id.
     *
     * @param id
     *            the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Video : {}", id);
        videoRepository.delete(id);
    }
}
