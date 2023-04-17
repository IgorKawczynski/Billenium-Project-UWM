package pl.uwm.projektzespolowy.exceptions;

public class WipLimitTooLowException extends RuntimeException{

    public WipLimitTooLowException(String message) {
        super(message);
    }

}
