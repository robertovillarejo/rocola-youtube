package io.github.robertovillarejo.domain;

import java.io.Serializable;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "rocola")
public class Rocola implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @Id
    private String id;

    @Field("playlist")
    private List<Video> playlist;

    @Field("credits")
    private Integer credits;

    private User user;

    public List<Video> getPlaylist() {
        return playlist;
    }

    public void setPlaylist(List<Video> playlist) {
        this.playlist = playlist;
    }

    public Integer getCredits() {
        return credits;
    }

    public void setCredits(Integer credits) {
        this.credits = credits;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
