package edu.brynmawr.cmsc353.webapp;

public class Comment {
    String content;
    String user;

    public Comment(String content, String user){
        this.content = content;
        this.user = user;
    }

    public String getContent() {
        return content;
    }

    public String getUser() {
        return user;
    }
}
