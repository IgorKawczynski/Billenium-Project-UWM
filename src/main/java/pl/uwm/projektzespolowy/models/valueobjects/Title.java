package pl.uwm.projektzespolowy.models.valueobjects;

import pl.uwm.projektzespolowy.exceptions.VOExceptions.EmptyTitleException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.InvalidTitleLengthException;

public class Title {

    public static final int MIN_LENGTH = 3;
    public static final int MAX_LENGTH = 45;

    private final String title;

    public Title(String title) {
        if (title == null) {
            throw new EmptyTitleException("Title can not be empty.");
        }
        if (!isCorrectLength(title)) {
            throw new InvalidTitleLengthException("Title must contain between " + MIN_LENGTH + " to " + MAX_LENGTH  + " characters length.");
        }
        this.title = title;
    }

    private boolean isCorrectLength(String title) {
        return title.length() >= MIN_LENGTH && title.length() <= MAX_LENGTH;
    }

}
