package pl.uwm.projektzespolowy.models.column;

public record ColumnUpdateDTO(String columnId, String title, Integer cardsLimit, boolean isUnlimited) {
}
