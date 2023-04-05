package pl.uwm.projektzespolowy.exceptions;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.EmptyTitleException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.VOExceptions;

import static org.assertj.core.api.Assertions.assertThat;

public class VOExceptionsTest {

    private VOExceptions voExceptions;
    private final EmptyTitleException emptyFileException = new EmptyTitleException("Title can not be empty.");

    @BeforeEach
    void setUp() {
        voExceptions = new VOExceptions();
    }

    @Test
    void testEmptyTitleException() {
        // when
        ErrorMessage errorMessage = voExceptions.emptyTitleHandler(emptyFileException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("title");
        assertThat(errorMessage.error()).isEqualTo(emptyFileException.getMessage());
    }
}
