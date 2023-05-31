package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.exceptions.CardMoveNotAllowedException;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.services.PositionableList;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
class CardMoverService {

    public ArrayList<Card> moveCardToAnotherCell(Card card, Cell cardOldCell, Cell cardNewCell, Integer newPosition) {
        isMoveAllowed(card);

        var cardsFromOldCell = new PositionableList<>(cardOldCell.getCards());
        cardsFromOldCell.withHigherOrEqualPositionThanGiven(card);
        cardsFromOldCell.moveLeftAll();

        changeCardCell(card, cardOldCell, cardNewCell, newPosition);

        var cardsFromNewCell = new PositionableList<>(cardNewCell.getCards());
        cardsFromNewCell.withHigherOrEqualPositionThanGiven(card);
        cardsFromNewCell.moveRightAll();

        var changedCards = new ArrayList<Card>();
        changedCards.addAll(cardsFromNewCell.list());
        changedCards.addAll(cardsFromOldCell.list());
        return changedCards;
    }

    private void changeCardCell(Card card, Cell cardOldCell, Cell cardNewCell, Integer newPosition) {
        card.getPosition().moveTo(newPosition);
        cardOldCell.remove(card);
        cardNewCell.add(card);
    }

    public ArrayList<Card> moveCard(Card card, Cell cell, Integer newPosition) {
        isMoveAllowed(card);

        var cardsToChange = new PositionableList<>(cell.getCards());
        cardsToChange.moveInRange(card.getPosition(), new Position(newPosition));

        card.getPosition().moveTo(newPosition);
        return new ArrayList<>(cardsToChange.list());
    }

    private void isMoveAllowed(Card card) {
        if (card.isLocked()) {
            throw new CardMoveNotAllowedException("The moving card cannot be locked.");
        }
    }

}
