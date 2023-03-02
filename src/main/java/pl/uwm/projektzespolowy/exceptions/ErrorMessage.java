package pl.uwm.projektzespolowy.exceptions;

public record ErrorMessage(String fieldName, String error) {

    @Override
    public String toString() {
        return error;
    }

}
