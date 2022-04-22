package edu.brynmawr.cmsc353.webapp;

public class Post {
    String title;
    String content;
    String id;
    String creatorName;
    String boardName;

    public Post(String title, String content, String id, String creatorName, String boardName) {
        this.title = title;
        this.content = content;
        this.id = id;
        this.creatorName = creatorName;
        this.boardName = boardName;
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
