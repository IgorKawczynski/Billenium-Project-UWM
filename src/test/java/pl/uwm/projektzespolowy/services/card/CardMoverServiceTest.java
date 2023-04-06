package pl.uwm.projektzespolowy.services.card;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import pl.uwm.projektzespolowy.exceptions.CardMoveNotAllowedException;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.ArrayList;
import java.util.Arrays;

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
        var firstCard = createCard(1L, 0);
        var secondCard = createCard(2L, 1);
        var movedCard = createCard(3L, 2);
        var fourthCard = createCard(4L, 3);
        var fifthCard = createCard(5L, 4);
        var oldCell = new Cell(null, new Position(0));
        oldCell.setCards(new ArrayList<>(Arrays.asList(firstCard, secondCard, movedCard, fourthCard, fifthCard)));

        var sixthCard = createCard(6L, 0);
        var seventhCard = createCard(7L, 1);
        var eighthCard = createCard(8L, 2);
        var newCell = new Cell(null, new Position(1));
        newCell.setCards(new ArrayList<>(Arrays.asList(sixthCard, seventhCard, eighthCard)));
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
