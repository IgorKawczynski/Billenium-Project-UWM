package pl.uwm.projektzespolowy.models.column;

public record ColumnUpdateDTO(Long columnId, String title, Integer cardsLimit, boolean isUnlimited) {
}
