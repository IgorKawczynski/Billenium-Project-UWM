package pl.uwm.projektzespolowy.exceptions.VOExceptions;

public class ColumnDoesNotExistsException extends RuntimeException {

    public ColumnDoesNotExistsException(String message) {
        super(message);
    }

}
