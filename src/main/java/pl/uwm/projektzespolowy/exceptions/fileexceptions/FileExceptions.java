package pl.uwm.projektzespolowy.exceptions.fileexceptions;

import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.uwm.projektzespolowy.exceptions.ErrorMessage;

@RestControllerAdvice
public class FileExceptions {

    @ExceptionHandler(FileSizeLimitExceededException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage fileSizeLimitExceededException(FileSizeLimitExceededException exception) {
        return new ErrorMessage("image", "The image size must be lass than 128kB.");
    }

    @ExceptionHandler(EmptyFileException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage emptyFileException(EmptyFileException exception) {
        return new ErrorMessage("image", exception.getMessage());
    }

    @ExceptionHandler(IllegalFileExtensionException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage illegalFileExtensionException(IllegalFileExtensionException exception) {
        return new ErrorMessage("image", exception.getMessage());
    }

    @ExceptionHandler(IllegalFileSizeException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage illegalFileSizeException(IllegalFileSizeException exception) {
        return new ErrorMessage("image", exception.getMessage());
    }

    @ExceptionHandler(CreatingFileException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorMessage creatingFileException(CreatingFileException exception) {
        return new ErrorMessage("image", exception.getMessage());
    }

}
