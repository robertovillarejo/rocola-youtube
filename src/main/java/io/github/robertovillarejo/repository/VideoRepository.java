package io.github.robertovillarejo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import io.github.robertovillarejo.domain.Video;

/**
 * Spring Data MongoDB repository for the Video entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideoRepository extends MongoRepository<Video, String> {
    
    public List<Video> findAllByUser(String id);
    
}
