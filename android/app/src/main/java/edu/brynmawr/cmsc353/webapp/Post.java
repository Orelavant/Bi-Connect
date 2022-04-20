package edu.brynmawr.cmsc353.webapp;

public class Post {
    String title;
    String content;
    String id;
    String creatorName;

    public Post(String title, String content, String id, String creatorName) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.creatorName = creatorName;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getId() {
        return id;
    }

    public String getCreatorName() {
        return creatorName;
    }

}
