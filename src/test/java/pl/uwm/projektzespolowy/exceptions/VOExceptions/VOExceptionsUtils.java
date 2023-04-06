package pl.uwm.projektzespolowy.exceptions.VOExceptions;

import pl.uwm.projektzespolowy.models.color.ColorValue;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class VOExceptionsUtils {

    public static final int MIN_LENGTH = 3;
    public static final int MAX_LENGTH= 45;
    public static final String EMAIL = "not#existing,email";
    public static final String FIELD_NAME = "fieldName";

    public static List<String> getAllowedColorValues() {
        return Stream.of(ColorValue.values())
                .map(ColorValue::getValue)
                .collect(Collectors.toList());
    }

}
