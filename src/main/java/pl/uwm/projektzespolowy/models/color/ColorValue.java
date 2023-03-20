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

    private final String textValue;

    ColorValue(String textValue) {
        this.textValue = textValue;
    }

    public String getTextValue() {
        return this.textValue;
    }

    public static ColorValue getColorValue(String givenValue) {
        return Stream.of(values())
                .filter(colorValue -> colorValue.textValue.equals(givenValue))
                .findFirst()
                .orElseThrow(() -> new InvalidColorValueException(String.format("ColorValue must be one of '%s', '%s', '%s', '%s', '%s' or '%s'",
                        DEFAULT.textValue, PURPLE.textValue, BLUE.textValue, GREEN.textValue, YELLOW.textValue, RED.textValue)));
    }

}
