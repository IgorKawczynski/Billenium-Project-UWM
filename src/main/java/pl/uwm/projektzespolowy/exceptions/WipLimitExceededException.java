package pl.uwm.projektzespolowy.exceptions;

public class WipLimitExceededException extends RuntimeException{

    public WipLimitExceededException(String message) {
        super(message);
    }

}
