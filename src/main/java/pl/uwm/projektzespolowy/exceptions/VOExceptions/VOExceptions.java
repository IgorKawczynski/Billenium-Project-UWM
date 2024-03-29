package pl.uwm.projektzespolowy.exceptions.VOExceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
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
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage invalidTitleLengthHandler(InvalidTitleLengthException exception) {
        return new ErrorMessage("title", exception.getMessage());
    }

    @ExceptionHandler(value = InvalidColorValueException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage invalidColorValueHandler(InvalidColorValueException exception) {
        return new ErrorMessage("color", exception.getMessage());
    }

    @ExceptionHandler(value = EmailNotFoundException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage emailNotFoundException(EmailNotFoundException exception) {
        return new ErrorMessage("email", exception.getMessage());
    }

    @ExceptionHandler(value = InvalidEmailException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage invalidEmailException(InvalidEmailException exception) {
        return new ErrorMessage("email", exception.getMessage());
    }

    @ExceptionHandler(value = EmailAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public ErrorMessage emailAlreadyExistsException(EmailAlreadyExistsException exception) {
        return new ErrorMessage("email", exception.getMessage());
    }

    @ExceptionHandler(value = RegexMatchException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage regexMatchException(RegexMatchException exception) {
        return new ErrorMessage(exception.getFieldName(), exception.getMessage());
    }

    @ExceptionHandler(value = FieldLengthException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage fieldLengthException(FieldLengthException exception) {
        return new ErrorMessage(exception.getFieldName(), exception.getMessage());
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public ErrorMessage badCredentialsException() {
        return new ErrorMessage("password", "You have written incorrect credentials.");
    }

}
