package pl.uwm.projektzespolowy.exceptions;

public class BoardHasTooFewRowsToDeleteException extends RuntimeException{

    public BoardHasTooFewRowsToDeleteException(String message) {
        super(message);
    }

}
