package pl.uwm.projektzespolowy.exceptions.VOExceptions;

public class RegexMatchException extends RuntimeException {
    private final String fieldName;

    public RegexMatchException(String fieldName, String message) {
        super(message);
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return fieldName;
    }

}
