package pl.uwm.projektzespolowy.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class EntityExceptions {

    @ExceptionHandler(value = EntityNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ErrorMessage entityNotFoundException(EntityNotFoundException exception) {
        return new ErrorMessage(exception.entityName, exception.getMessage());
    }

    @ExceptionHandler(value = BoardHasTooFewColumnsToDeleteException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage boardHasTooFewColumnsToDeleteException(BoardHasTooFewColumnsToDeleteException exception) {
        return new ErrorMessage("columns", exception.getMessage());
    }

    @ExceptionHandler(value = ColumnCantBeDeletedException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage columnCantBeDeletedException(ColumnCantBeDeletedException exception) {
        return new ErrorMessage("column", exception.getMessage());
    }

}
