package pl.uwm.projektzespolowy.exceptions;

public class BoardHasTooFewColumnsToDeleteException extends RuntimeException {

    public BoardHasTooFewColumnsToDeleteException(String message) {
        super(message);
    }

}
