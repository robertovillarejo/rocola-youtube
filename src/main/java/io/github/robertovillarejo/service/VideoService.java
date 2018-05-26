package io.github.robertovillarejo.service;

import io.github.robertovillarejo.domain.Video;
import java.util.List;

/**
 * Service Interface for managing Video.
 */
public interface VideoService {

    /**
     * Save a video.
     *
     * @param video the entity to save
     * @return the persisted entity
     */
    Video save(Video video);

    /**
     * Get all the videos.
     *
     * @return the list of entities
     */
    List<Video> findAll();

    /**
     * Get the "id" video.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Video findOne(String id);

    /**
     * Delete the "id" video.
     *
     * @param id the id of the entity
     */
    void delete(String id);
}
