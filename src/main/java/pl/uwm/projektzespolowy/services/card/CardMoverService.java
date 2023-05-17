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
        if (isMovingToLastColumn(cardNewCell)) {
            areAllChildrenFinished(card);
        }

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

    private void areAllChildrenFinished(Card card) {
        var board = card.getCell().getColumn().getBoard();
        var children = card.getChildren(board);

        var columns = board.getColumns();
        var lastColumnPosition = new PositionableList<>(columns).getLastElement().getPosition().value();

        for (Card child: children) {
            var cardsColumnPosition = child.getCell().getColumn().getPosition().value();
            if (cardsColumnPosition != lastColumnPosition) {
                throw new CardMoveNotAllowedException("All children of parent card must be in last column before card can be done.");
            }
        }
    }

    private boolean isMovingToLastColumn(Cell cardNewCell) {
        var board = cardNewCell.getColumn().getBoard();

        var columns = board.getColumns();
        var cellsColumnPosition = cardNewCell.getColumn().getPosition().value();
        var lastColumnPosition = new PositionableList<>(columns).getLastElement().getPosition().value();

        return cellsColumnPosition == lastColumnPosition;
    }

}
