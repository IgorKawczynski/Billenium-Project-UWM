package pl.uwm.projektzespolowy.models.color;

import pl.uwm.projektzespolowy.exceptions.VOExceptions.InvalidColorValueException;

import java.util.stream.Stream;

public enum ColorValue {

    DEFAULT("default"),
    PURPLE("purple"),
    BLUE("blue"),
    GREEN("green"),
    YELLOW("yellow"),
    RED("red");

    private final String value;

    ColorValue(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static ColorValue getColorValue(String givenValue) {
        return Stream.of(values())
                .filter(colorValue -> colorValue.value.equals(givenValue))
                .findFirst()
                .orElseThrow(() -> new InvalidColorValueException(String.format("ColorValue must be one of '%s', '%s', '%s', '%s', '%s' or '%s'",
                        DEFAULT.value, PURPLE.value, BLUE.value, GREEN.value, YELLOW.value, RED.value)));
    }

}
