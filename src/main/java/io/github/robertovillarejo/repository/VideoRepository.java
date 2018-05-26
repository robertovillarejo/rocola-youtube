package io.github.robertovillarejo.repository;

import io.github.robertovillarejo.domain.Video;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Video entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoRepository extends MongoRepository<Video, String> {

}
