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

    @ExceptionHandler(value = BoardHasTooFewRowsToDeleteException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage boardHasTooFewRowsToDeleteException(BoardHasTooFewRowsToDeleteException exception) {
        return new ErrorMessage("rows", exception.getMessage());
    }

    @ExceptionHandler(value = RowCantBeDeletedException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage rowCantBeDeletedException(RowCantBeDeletedException exception) {
        return new ErrorMessage("row", exception.getMessage());
    }

    @ExceptionHandler(value = CardMoveNotAllowedException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage cardMoveNotAllowedException(CardMoveNotAllowedException exception) {
        return new ErrorMessage("card", exception.getMessage());
    }

    @ExceptionHandler(value = WipLimitExceededException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage wipLimitExceededException(WipLimitExceededException exception) {
        return new ErrorMessage("wipLimit", exception.getMessage());
    }

    @ExceptionHandler(value = WipLimitTooLowException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    public ErrorMessage wipLimitTooLowException(WipLimitTooLowException exception) {
        return new ErrorMessage("wipLimit", exception.getMessage());
    }

    @ExceptionHandler(value = CardCantBeChildException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage cardCantBeChildException(CardCantBeChildException exception) {
        return new ErrorMessage("card", exception.getMessage());
    }

}
