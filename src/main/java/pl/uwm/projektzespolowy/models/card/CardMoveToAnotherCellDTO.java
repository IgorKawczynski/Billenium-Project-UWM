package pl.uwm.projektzespolowy.models.card;

public record CardMoveToAnotherCellDTO(String cardId, String newCellId, Integer newPosition) {
}
