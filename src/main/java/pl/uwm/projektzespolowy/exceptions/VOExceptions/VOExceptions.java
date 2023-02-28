package pl.uwm.projektzespolowy.exceptions.VOExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.exceptions.ErrorMessage;

@RestControllerAdvice
public class VOExceptions {

    // TODO
    // Exceptions for VO like; Name too long, bad credentials, itp
//    @ExceptionHandler(value = IntegerValidatorException.class)
//    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
//    public ErrorMessage exampleException(ExampleException exception) {
//        return new ErrorMessage(exception.getMessage());
//    }
}
