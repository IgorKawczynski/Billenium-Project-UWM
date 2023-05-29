package pl.uwm.projektzespolowy.services.card;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.uwm.projektzespolowy.exceptions.CardMoveNotAllowedException;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static pl.uwm.projektzespolowy.services.card.CardTestUtils.*;

public class CardMoverServiceTest {

    public static final int NEW_CARD_POSITION_IN_THE_NEW_CELL = 1;
    public static final int NEW_CARD_POSITION_IN_THE_SAME_CELL = 2;
    private CardMoverService cardMoverService;

    @BeforeEach
    void setUp() {
        cardMoverService = new CardMoverService();
    }

    @Test
    void shouldMoveCardToAnotherCellAndMoveCardsInOldCell() {
        // given
        var user = createUser(100L);
        var board = createBoard(user);

        var firstColumn = createColumn(0, board);
        var secondColumn = createColumn(1, board);
        List<Column> columns = new ArrayList<>();
        columns.add(firstColumn);
        columns.add(secondColumn);
        board.setColumns(columns);

        var oldCell = new Cell(firstColumn, new Position(0));
        var firstCard = createCardWithCell(1L, 0, oldCell);
        var secondCard = createCardWithCell(2L, 1, oldCell);
        var movedCard = createCardWithCell(3L, 2, oldCell);
        var fourthCard = createCardWithCell(4L, 3, oldCell);
        var fifthCard = createCardWithCell(5L, 4, oldCell);
        oldCell.setCards(new ArrayList<>(Arrays.asList(firstCard, secondCard, movedCard, fourthCard, fifthCard)));

        List<Cell> cellsOld = new ArrayList<>();
        cellsOld.add(oldCell);
        firstColumn.setCells(cellsOld);

        var newCell = new Cell(secondColumn, new Position(1));
        var sixthCard = createCardWithCell(6L, 0, newCell);
        var seventhCard = createCardWithCell(7L, 1, newCell);
        var eighthCard = createCardWithCell(8L, 2, newCell);
        newCell.setCards(new ArrayList<>(Arrays.asList(sixthCard, seventhCard, eighthCard)));

        List<Cell> cellsNew = new ArrayList<>();
        cellsNew.add(newCell);
        secondColumn.setCells(cellsNew);

        // when
        cardMoverService.moveCardToAnotherCell(movedCard, oldCell, newCell, NEW_CARD_POSITION_IN_THE_NEW_CELL);
        // then
        assertThat(firstCard.getPosition().value()).isEqualTo(0);
        assertThat(secondCard.getPosition().value()).isEqualTo(1);
        assertThat(fourthCard.getPosition().value()).isEqualTo(2);
        assertThat(fifthCard.getPosition().value()).isEqualTo(3);
        assertThat(oldCell.getCards()).hasSize(4);

        assertThat(sixthCard.getPosition().value()).isEqualTo(0);
        assertThat(movedCard.getPosition().value()).isEqualTo(NEW_CARD_POSITION_IN_THE_NEW_CELL);
        assertThat(seventhCard.getPosition().value()).isEqualTo(2);
        assertThat(eighthCard.getPosition().value()).isEqualTo(3);
        assertThat(newCell.getCards()).hasSize(4);
    }

    @Test
    void shouldMoveCardsInTheSameCell() {
        // given
        var firstCard = createCard(1L, 0);
        var secondCard = createCard(2L, 1);
        var thirdCard = createCard(3L, 2);
        var fourthCard = createCard(4L, 3);
        var fifthCard = createCard(5L, 4);
        var cell = new Cell(null, new Position(0));
        cell.setCards(new ArrayList<>(Arrays.asList(firstCard, secondCard, thirdCard, fourthCard, fifthCard)));
        // when
        cardMoverService.moveCard(firstCard, cell, NEW_CARD_POSITION_IN_THE_SAME_CELL);
        // then
        assertThat(firstCard.getPosition().value()).isEqualTo(2);
        assertThat(secondCard.getPosition().value()).isEqualTo(0);
        assertThat(thirdCard.getPosition().value()).isEqualTo(1);
        assertThat(fourthCard.getPosition().value()).isEqualTo(3);
        assertThat(fifthCard.getPosition().value()).isEqualTo(4);
    }

    @Test
    void shouldThrowCardMoveNotAllowedException() {
        // given
        var firstCard = createCard(1L, 0);
        var secondCard = createCard(2L, 1);
        var thirdCard = createCard(3L, 2);
        secondCard.setLocked(true);
        var cell = new Cell(null, new Position(0));
        cell.setCards(new ArrayList<>(Arrays.asList(firstCard, secondCard, thirdCard)));
        // then
        assertThatThrownBy(() -> cardMoverService.moveCard(secondCard, cell, 0))
                .isInstanceOf(CardMoveNotAllowedException.class)
                .hasMessage("The moving card cannot be locked.");
    }

}
