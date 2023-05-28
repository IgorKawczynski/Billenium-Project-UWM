package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.EmailAlreadyExistsException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.FieldLengthException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.InvalidEmailException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.RegexMatchException;

@Component
@RequiredArgsConstructor
class UserValidator {

    private final UserRepository userRepository;
    public static final String NAME_REGEX = "^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]*$";
    public static final String EMAIL_REGEX = "[\\p{Alpha}\\p{Digit}]++@[\\p{Alpha}\\p{Digit}]++.[\\p{Alpha}\\p{Digit}]++";
    public static final String PASSWORD_REGEX = "[\\p{Alnum}\\p{Punct}]++";
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void isNull(String fieldName, Object fieldValue) {
        if (fieldValue == null) {
            throw new NullPointerException(String.format("Field %s cannot be empty.", fieldName));
        }
    }

    public void emailContainsAtSign(String email) {
        if(email != null && !email.contains("@")) {
            throw new InvalidEmailException("Email must contain '@' sign.");
        }
    }

    public void validateFieldRegex(String fieldName, String fieldValue, String regex) {
        if (!fieldValue.matches(regex)) {
            throw new RegexMatchException(fieldName, String.format("%s includes not allowed characters.", fieldName));
        }
    }

    public void validateFieldLength(String fieldName, String fieldValue, Integer minLength, Integer maxLength) {
        if (fieldValue.length() > maxLength || fieldValue.length() < minLength) {
            throw new FieldLengthException(
                    fieldName,
                    String.format("%s must contain between %d and %d characters.", fieldName, minLength, maxLength)
            );
        }
    }

    public void checkIfUserExists(String email) {
        if (!userRepository.existsByEmail(email)) {
            throw new BadCredentialsException("There is no such user with given email.");
        }
    }

    public void checkIfUserAlreadyExists(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("User with given email already exists.");
        }
    }

    public void checkIfCredentialsAreProper(String email, String password) {
        if (!passwordEncoder.matches(password, userRepository.findRegisteredUserByEmail(email).getPassword())) {
            throw new BadCredentialsException("You have written bad email or password.");
        }
    }

}
