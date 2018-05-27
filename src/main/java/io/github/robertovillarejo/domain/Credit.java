package io.github.robertovillarejo.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "credit")
public class Credit {

    @Id
    private String id;

    @Field("credits_count")
    private Integer creditsCount;

    @DBRef
    private User user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getCreditsCount() {
        return creditsCount;
    }

    public void setCreditsCount(Integer credits) {
        this.creditsCount = credits;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
