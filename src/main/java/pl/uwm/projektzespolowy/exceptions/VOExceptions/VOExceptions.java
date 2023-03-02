package pl.uwm.projektzespolowy.exceptions.VOExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.uwm.projektzespolowy.exceptions.ErrorMessage;

@RestControllerAdvice
public class VOExceptions {

    @ExceptionHandler(value = EmptyTitleException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage emptyTitleHandler(EmptyTitleException exception) {
        return new ErrorMessage("title", exception.getMessage());
    }

    @ExceptionHandler(value = InvalidTitleLengthException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage invalidTitleLengthHandler(InvalidTitleLengthException exception) {
        return new ErrorMessage("title", exception.getMessage());
    }

}
