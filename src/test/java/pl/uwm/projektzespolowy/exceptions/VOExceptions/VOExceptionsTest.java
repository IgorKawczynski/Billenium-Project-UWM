package pl.uwm.projektzespolowy.exceptions.VOExceptions;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.BadCredentialsException;
import pl.uwm.projektzespolowy.exceptions.ErrorMessage;

import static org.assertj.core.api.Assertions.assertThat;
import static pl.uwm.projektzespolowy.exceptions.VOExceptions.VOExceptionsUtils.MIN_LENGTH;
import static pl.uwm.projektzespolowy.exceptions.VOExceptions.VOExceptionsUtils.MAX_LENGTH;
import static pl.uwm.projektzespolowy.exceptions.VOExceptions.VOExceptionsUtils.EMAIL;
import static pl.uwm.projektzespolowy.exceptions.VOExceptions.VOExceptionsUtils.FIELD_NAME;

public class VOExceptionsTest {

    private VOExceptions voExceptions;
    private final EmptyTitleException emptyFileException = new EmptyTitleException("Title can not be empty.");
    private final InvalidTitleLengthException invalidTitleLengthException = new InvalidTitleLengthException("Title must contain between " + MIN_LENGTH + " to " + MAX_LENGTH  + " characters length.");
    private final InvalidColorValueException invalidColorValueException = new InvalidColorValueException(String.format("ColorValue must be one of '%s'",
        String.join("', '", VOExceptionsUtils.getAllowedColorValues())));
    private final EmailNotFoundException emailNotFoundException = new EmailNotFoundException("Failed to find user with email: " + EMAIL);
    private final InvalidEmailException invalidEmailException = new InvalidEmailException("Email must contain '@' sign.");
    private final EmailAlreadyExistsException emailAlreadyExistsException = new EmailAlreadyExistsException("User with given email already exists.");
    private final RegexMatchException regexMatchException = new RegexMatchException(String.format("%s includes not allowed characters.", FIELD_NAME));
    private final FieldLengthException fieldLengthException = new FieldLengthException(String.format("%s must contain between %d and %d characters.", FIELD_NAME, MIN_LENGTH, MAX_LENGTH));
    private final BadCredentialsException badCredentialsException = new BadCredentialsException("You have written wrong email or password.");


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

    @Test
    void testInvalidTitleLengthException() {
        // when
        ErrorMessage errorMessage = voExceptions.invalidTitleLengthHandler(invalidTitleLengthException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("title");
        assertThat(errorMessage.error()).isEqualTo(invalidTitleLengthException.getMessage());
    }

    @Test
    void testInvalidColorValueException() {
        // when
        ErrorMessage errorMessage = voExceptions.invalidColorValueHandler(invalidColorValueException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("color");
        assertThat(errorMessage.error()).isEqualTo(invalidColorValueException.getMessage());
    }

    @Test
    void testEmailNotFoundException() {
        // when
        ErrorMessage errorMessage = voExceptions.emailNotFoundException(emailNotFoundException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("email");
        assertThat(errorMessage.error()).isEqualTo(emailNotFoundException.getMessage());
    }

    @Test
    void testInvalidEmailException() {
        // when
        ErrorMessage errorMessage = voExceptions.invalidEmailException(invalidEmailException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("email");
        assertThat(errorMessage.error()).isEqualTo(invalidEmailException.getMessage());
    }

    @Test
    void testEmailAlreadyExistsException() {
        // when
        ErrorMessage errorMessage = voExceptions.emailAlreadyExistsException(emailAlreadyExistsException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("email");
        assertThat(errorMessage.error()).isEqualTo(emailAlreadyExistsException.getMessage());
    }

    @Test
    void testRegexMatchException() {
        // when
        ErrorMessage errorMessage = voExceptions.regexMatchException(regexMatchException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("");
        assertThat(errorMessage.error()).isEqualTo(regexMatchException.getMessage());
    }

    @Test
    void testFieldLengthException() {
        // when
        ErrorMessage errorMessage = voExceptions.fieldLengthException(fieldLengthException);
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("");
        assertThat(errorMessage.error()).isEqualTo(fieldLengthException.getMessage());
    }

    @Test
    void testBadCredentialsException() {
        // when
        ErrorMessage errorMessage = voExceptions.badCredentialsException();
        // then
        assertThat(errorMessage.fieldName()).isEqualTo("password");
        assertThat(errorMessage.error()).isEqualTo(badCredentialsException.getMessage());
    }

}
