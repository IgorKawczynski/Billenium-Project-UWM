package pl.uwm.projektzespolowy;

import org.junit.jupiter.api.Test;
import pl.uwm.projektzespolowy.exceptions.ElementDoesNotExists;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.PositionableList;
import static org.assertj.core.api.Assertions.*;
import java.util.List;

public class PositionableListTest {

    List<Card> cards = List.of(
            new Card(new Title("first card"), "abc", null, new Position(0)),
            new Card(new Title("third card"), "abc", null, new Position(2)),
            new Card(new Title("sixth card"), "abc", null, new Position(5)),
            new Card(new Title("fifth card"), "abc", null, new Position(4)),
            new Card(new Title("seventh card"), "abc", null, new Position(6)),
            new Card(new Title("second card"), "abc", null, new Position(1)),
            new Card(new Title("eighth card"), "abc", null, new Position(7)),
            new Card(new Title("fourth card"), "abc", null, new Position(3)));

    PositionableList<Card> positionables = new PositionableList<>(cards);

    @Test
    void shouldThrowElementDoesNotExistsException() {
        //when
        int wrongPosition = 99999;
        //then
        assertThatThrownBy(() -> positionables.get(wrongPosition))
                .isInstanceOf(ElementDoesNotExists.class)
                .hasMessage("Element with position " + wrongPosition + "doesn't exists!");
    }
    @Test
    void shouldReturnPreviousCard() {
        //when
        var cardWithPositionEqualsFive = positionables.get(5);
        var cardWithPositionEqualsFour = positionables.getPreviousElement(cardWithPositionEqualsFive);
        //then
        assertThat(cardWithPositionEqualsFour.getPosition().value()).isEqualTo(4);
    }

    @Test
    void shouldReturnSecondCard() {
        //when
        var secondCard = positionables.get(1);
        //then
        assertThat(secondCard.getTitle().toString()).isEqualTo("second card");
    }

}
