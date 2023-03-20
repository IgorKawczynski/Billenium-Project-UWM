package pl.uwm.projektzespolowy.models.card;

public record CardMoveToAnotherCellDTO(String cardId, String newColumnId, Integer newPosition) {
}
