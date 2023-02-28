package pl.uwm.projektzespolowy.basic;

import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.IntegerValidatorException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.StringValidatorException;

@Component
public class ValidatorService {

    // TODO - Validation for VOs
//    public static final String NAME_REGEX = "[\\p{Alpha}\\p{Space}-.']++";
//    public static final String EMAIL_REGEX = "[\\p{Alpha}\\p{Digit}]++@[\\p{Alpha}\\p{Digit}]++.[\\p{Alpha}\\p{Digit}]++";
//    public static final String PASSWORD_REGEX = "[\\p{Alnum}\\p{Punct}]++";

    public void isNull(String fieldName, Object fieldValue) {
        if (fieldValue == null) {
            throw new NullPointerException(String.format("Field %s cannot be empty!", fieldName));
        }
    }

    public void emailContainsAtSign(String email) {
        if(email != null && !email.contains("@")) {
            throw new StringValidatorException("Email must contain '@' !");
        }
    }

    public void validateIntegerLessThan(Integer integerToValidate, Integer lessThanValue) {
        if (integerToValidate.compareTo(lessThanValue) < 0) {
            throw new IntegerValidatorException(String.format("%d must be greater than %d", integerToValidate, lessThanValue));
        }
    }

    public void validateIntegerBiggerThan(Integer integerToValidate, Integer biggerThanValue) {
        if (integerToValidate.compareTo(biggerThanValue) > 0) {
            throw new IntegerValidatorException(String.format("%d must be lesser than %d", integerToValidate, biggerThanValue));
        }
    }
}
