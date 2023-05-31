package pl.uwm.projektzespolowy.models.user;

import pl.uwm.projektzespolowy.exceptions.VOExceptions.InvalidColorValueException;

import java.util.stream.Stream;

public enum AvatarColor {

    CREAMY_PEACH("#F3A683"),
    ROSY_HIGHLIGHT("#F7D794"),
    SOFT_BLUE("#778BEB"),
    BREWED_MUSTARD("#E77F67"),
    OLD_GERANIUM("#CF6A87"),
    PURPLE_MAJESTY("#786FA6"),
    ROGUE_PINK("#F8A5C2"),
    SQUEAKY("#63CDDA"),
    APPLE_VALLEY("#EA8685"),
    GREY("#596275");
    private final String value;

    AvatarColor(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

    public static AvatarColor getColorValue(String givenValue) {
        return Stream.of(values())
                .filter(colorValue -> colorValue.value.equals(givenValue))
                .findFirst()
                .orElseThrow(() -> new InvalidColorValueException(
                        String.format("ColorValue must be one of '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' or '%s'",
                                CREAMY_PEACH.value,
                                ROSY_HIGHLIGHT.value,
                                SOFT_BLUE.value,
                                BREWED_MUSTARD.value,
                                OLD_GERANIUM.value,
                                PURPLE_MAJESTY.value,
                                ROGUE_PINK.value,
                                SQUEAKY.value,
                                APPLE_VALLEY.value,
                                GREY.value
                                )));
    }

}
