package pl.uwm.projektzespolowy;

import org.junit.jupiter.api.Test;
import pl.uwm.projektzespolowy.exceptions.ElementDoesNotExists;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.PositionableList;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class PositionableListTest {

    Card firstCard = new Card(new Title("first card"), "abc", null, new Position(0));
    Card thirdCard = new Card(new Title("third card"), "abc", null, new Position(2));
    Card sixthCard = new Card(new Title("sixth card"), "abc", null, new Position(5));
    Card fifthCard = new Card(new Title("fifth card"), "abc", null, new Position(4));
    Card seventhCard = new Card(new Title("seventh card"), "abc", null, new Position(6));
    Card secondCard = new Card(new Title("second card"), "abc", null, new Position(1));
    Card eighthCard = new Card(new Title("eighth card"), "abc", null, new Position(7));
    Card fourthCard = new Card(new Title("fourth card"), "abc", null, new Position(3));

    List<Card> cards = List.of(firstCard, thirdCard, sixthCard, fifthCard, seventhCard, secondCard, eighthCard, fourthCard);

    PositionableList<Card> positionables = new PositionableList<>(cards);

    @Test
    void shouldThrowElementDoesNotExistsException() {
        // when
        int wrongPosition = 99999;
        // then
        assertThatThrownBy(() -> positionables.get(wrongPosition))
                .isInstanceOf(ElementDoesNotExists.class)
                .hasMessage("Element with position " + wrongPosition + " doesn't exists!");
    }
    @Test
    void shouldReturnPreviousCard() {
        // when
        var cardWithPositionEqualsFive = positionables.get(5);
        var cardWithPositionEqualsFour = positionables.getPreviousElement(cardWithPositionEqualsFive);
        // then
        assertThat(cardWithPositionEqualsFour.getPosition().value()).isEqualTo(4);
    }

    @Test
    void shouldReturnSecondCard() {
        // when
        var secondCard = positionables.get(1);
        // then
        assertThat(secondCard.getTitle().toString()).isEqualTo("second card");
    }

    @Test
    void shouldReturnLastElement() {
        // when
        var lastElement = positionables.getLastElement();
        // then
        assertThat(lastElement.getPosition().value()).isEqualTo(7);
    }

    @Test
    void shouldReturnFirstElement() {
        // when
        var firstElement = positionables.getFirstElement();
        // then
        assertThat(firstElement.getPosition().value()).isEqualTo(0);
    }

    @Test
    void shouldChangeAllPositionsToBeOneLess() {
        // given
        var firstCard = new Card(new Title("first card"),"abc", null, new Position(5));
        var secondCard = new Card(new Title("second card"),"abc",null, new Position(6));
        var thirdCard = new Card(new Title("third card"),"abc",null, new Position(7));
        PositionableList<Card> cards = new PositionableList<>(List.of(firstCard, secondCard, thirdCard));
        // when
        cards.moveLeftAll();
        //then
        assertThat(firstCard.getPosition().value()).isEqualTo(4);
        assertThat(secondCard.getPosition().value()).isEqualTo(5);
        assertThat(thirdCard.getPosition().value()).isEqualTo(6);
    }

    @Test
    void shouldChangeAllPositionsToBeOneBigger() {
        // given
        var firstCard = new Card(new Title("first card"), "abc", null, new Position(5));
        var secondCard = new Card(new Title("second card"), "abc", null, new Position(6));
        var thirdCard = new Card(new Title("third card"), "abc", null, new Position(7));
        PositionableList<Card> cards = new PositionableList<>(List.of(firstCard, secondCard, thirdCard));
        // when
        cards.moveRightAll();
        //then
        assertThat(firstCard.getPosition().value()).isEqualTo(6);
        assertThat(secondCard.getPosition().value()).isEqualTo(7);
        assertThat(thirdCard.getPosition().value()).isEqualTo(8);
    }

    @Test
    void shouldReturnAllPositionablesWithPositionHigherOrEqualThanFour() {
        // given
        var positionableWithPositionEqualsFour = fifthCard;
        // when
        positionables.withHigherOrEqualPositionThanGiven(positionableWithPositionEqualsFour);
        // then
        assertThat(positionables.list()).containsOnlyOnce(sixthCard, seventhCard, eighthCard);
    }

    @Test
    void shouldReturnPositionablesWithPositionInRange() {
        // given
        var lowerBound = new Position(3);
        var upperBound = new Position(7);
        // when
        positionables.withPositionInRange(lowerBound, upperBound);
        // then
        assertThat(positionables.list()).containsOnlyOnce(fourthCard, sixthCard, seventhCard, eighthCard);
    }

}
