package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class CardDeleter {

    private final CardRepository cardRepository;

    public void deleteCard(Column column, Card cardToDelete) {
        var columnCards = new PositionableList<>(column.getCards());

        columnCards.withHigherOrEqualPositionThanGiven(cardToDelete);
        columnCards.moveLeftAll();
        column.remove(cardToDelete);

        cardRepository.delete(cardToDelete);
        cardRepository.saveAll(columnCards.list());
    }

}
