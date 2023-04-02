package pl.uwm.projektzespolowy.exceptions;

import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class FileExceptions {

    @ExceptionHandler(FileSizeLimitExceededException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public ErrorMessage fileSizeLimitExceededException(FileSizeLimitExceededException exception) {
        return new ErrorMessage("image", "The image can contain a maximum of 128kB.");
    }

}
