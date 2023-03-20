package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class CardDeleter {

    private final CardRepository cardRepository;

    public void deleteCard(Cell cell, Card cardToDelete) {
        var cellCards = new PositionableList<>(cell.getCards());

        cellCards.withHigherOrEqualPositionThanGiven(cardToDelete);
        cellCards.moveLeftAll();
        cell.remove(cardToDelete);

        cardRepository.delete(cardToDelete);
        cardRepository.saveAll(cellCards.list());
    }

}
