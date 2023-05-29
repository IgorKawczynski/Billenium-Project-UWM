package pl.uwm.projektzespolowy.exceptions.VOExceptions;

public class FieldLengthException extends RuntimeException {

    private final String fieldName;

    public FieldLengthException(String fieldName, String message) {
        super(message);
        this.fieldName = fieldName;
    }

    public String getFieldName() {
        return fieldName;
    }

}
