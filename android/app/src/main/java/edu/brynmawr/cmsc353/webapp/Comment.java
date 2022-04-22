package edu.brynmawr.cmsc353.webapp;

public class Comment {
    String content;
    String user;
    String id;
    String postid;

    public Comment(String content, String user, String id, String postid){
        this.content = content;
        this.user = user;
        this.id = id;
        this.postid = id;
    }

    public String getContent() {
        return content;
    }

    public String getUser() {
        return user;
    }

    public String getId(){return id;}

    public String getPostId(){return postid;}


}
