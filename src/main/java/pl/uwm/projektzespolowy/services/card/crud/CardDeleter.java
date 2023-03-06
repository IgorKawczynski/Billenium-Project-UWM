package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.services.PositionableList;
import pl.uwm.projektzespolowy.services.card.CardRepository;
import pl.uwm.projektzespolowy.services.column.crud.ColumnReader;

@Component
@RequiredArgsConstructor
public class CardDeleter {

    private final CardRepository cardRepository;
    private final ColumnReader columnReader;

    public void deleteCard(Card cardToDelete) {
        var column = columnReader.getColumnById(cardToDelete.getColumn().getId());
        var columnCards = new PositionableList<>(column.getCards());
        columnCards.withHigherOrEqualPositionThanGiven(cardToDelete);
        columnCards.moveLeftAll();
        column.remove(cardToDelete);
        cardRepository.delete(cardToDelete);
        cardRepository.saveAll(columnCards.list());
    }

}
