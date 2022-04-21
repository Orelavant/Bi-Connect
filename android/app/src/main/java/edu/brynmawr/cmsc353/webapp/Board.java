package edu.brynmawr.cmsc353.webapp;

public class Board {
    String name;
    String description;

    public Board(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }


}
