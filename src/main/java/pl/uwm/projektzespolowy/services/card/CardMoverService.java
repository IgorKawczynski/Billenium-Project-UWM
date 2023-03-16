package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.services.PositionableList;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CardMoverService {

    public ArrayList<Card> moveCardToAnotherColumn(Card card, Column cardOldColumn, Column cardNewColumn, Integer newPosition) {
        var cardsFromOldColumn = new PositionableList<>(cardOldColumn.getCards());
        cardsFromOldColumn.withHigherOrEqualPositionThanGiven(card);
        cardsFromOldColumn.moveLeftAll();

        changeCardColumn(card, cardOldColumn, cardNewColumn, newPosition);

        var cardsFromNewColumn = new PositionableList<>(cardNewColumn.getCards());
        cardsFromNewColumn.withHigherOrEqualPositionThanGiven(card);
        cardsFromNewColumn.moveRightAll();

        var changedCards = new ArrayList<Card>();
        changedCards.addAll(cardsFromNewColumn.list());
        changedCards.addAll(cardsFromOldColumn.list());
        return changedCards;
    }

    private void changeCardColumn(Card card, Column cardOldColumn, Column cardNewColumn, Integer newPosition) {
        card.getPosition().moveTo(newPosition);
        cardOldColumn.remove(card);
        cardNewColumn.add(card);
    }

    public ArrayList<Card> moveCard(Card card, Integer newPosition) {
        var cardsToChange = new PositionableList<>(card.getColumn().getCards());

        if (newPosition < card.getPosition().value()) {
            cardsToChange.withPositionInRange(new Position(newPosition), card.getPosition());
            cardsToChange.moveRightAll();
        }

        if (newPosition > card.getPosition().value()) {
            cardsToChange.withPositionInRange(card.getPosition(), new Position(newPosition));
            cardsToChange.moveLeftAll();
        }

        card.getPosition().moveTo(newPosition);
        return new ArrayList<>(cardsToChange.list());
    }

}
