package pl.uwm.projektzespolowy.services.card.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.exceptions.WipLimitExceededException;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.color.ColorValue;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.ArrayList;
import java.util.Arrays;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.atMostOnce;
import static org.mockito.Mockito.verify;
import static pl.uwm.projektzespolowy.services.card.CardTestUtils.*;

@ExtendWith(MockitoExtension.class)
public class CardUpdaterTest {

    private final CardRepository cardRepository = Mockito.mock(CardRepository.class);
    private CardUpdater cardUpdater;

    @BeforeEach
    void setUp() {
        cardUpdater = new CardUpdater(cardRepository);
    }

    @Test
    void shouldEditCard() {
        // given
        var card = createCard(1L, 0);
        card.setTitle(new Title("i like to sing"));
        card.setDescription("some pop music");
        // when
        cardUpdater.editCard(card, "i like to fly", "in the blue sky");
        // then
        assertThat(card.getTitle().toString()).isEqualTo("i like to fly");
        assertThat(card.getDescription()).isEqualTo("in the blue sky");
    }

    @Test
    void shouldNotEditCardTitleWhenTitleIsNull() {
        var card = createCard(1L, 0);
        card.setTitle(new Title("i like to sing"));
        card.setDescription("some pop music");
        // when
        cardUpdater.editCard(card, null, "in the blue sky");
        // then
        assertThat(card.getTitle().toString()).isEqualTo("i like to sing");
        assertThat(card.getDescription()).isEqualTo("in the blue sky");
    }

    @Test
    void shouldNotEditCardDescriptionWhenDescriptionIsNull() {
        var card = createCard(1L, 0);
        card.setTitle(new Title("i like to sing"));
        card.setDescription("some pop music");
        // when
        cardUpdater.editCard(card, "i like to fly", null);
        // then
        assertThat(card.getTitle().toString()).isEqualTo("i like to fly");
        assertThat(card.getDescription()).isEqualTo("some pop music");
    }

    @Test
    void shouldAssignUserToCard() {
        // given
        var card = createCardWithAssignedUsers(1L, 0);
        var user = createUser(1L);
        Integer boardWipLimit = 3;
        // when
        cardUpdater.assignUserToCard(card, user, boardWipLimit, 2);
        // then
        ArgumentCaptor<Card> cardArgumentCaptor = ArgumentCaptor.forClass(Card.class);
        verify(cardRepository, atMostOnce()).saveAndFlush(cardArgumentCaptor.capture());
        assertThat(card.getAssignedUsers()).contains(user);
        assertThat(card.getAssignedUsers().size()).isEqualTo(4);
    }

    @Test
    void shouldThrowExceptionWhileAssigningUserToCardWhenWipLimitExceeded() {
        // given
        var card = createCardWithAssignedUsers(1L, 0);
        var user = createUser(1L);
        Integer boardWipLimit = 3;
        // then
        assertThatThrownBy(() -> cardUpdater.assignUserToCard(card, user, boardWipLimit, 3))
                .isInstanceOf(WipLimitExceededException.class)
                .hasMessage(String.format("User has reached the assignment limit (%d).", boardWipLimit));
    }

    @Test
    void shouldSaveChangedCards() {
        // given
        var firstCard = createCard(1L, 0);
        var secondCard = createCard(2L, 1);

        firstCard.setColor(ColorValue.BLUE);
        secondCard.setColor(ColorValue.RED);

        var cards = new ArrayList<>(Arrays.asList(firstCard, secondCard));
        // when
        cardUpdater.saveChangedCards(cards);
        // then
        assertThat(firstCard.getColor()).isEqualTo(ColorValue.BLUE);
        assertThat(secondCard.getColor()).isEqualTo(ColorValue.RED);
    }

    @Test
    void shouldSaveChangedCard() {
        // given
        var firstCard = createCard(1L, 0);
        firstCard.setColor(ColorValue.BLUE);
        // when
        cardUpdater.saveChangedCard(firstCard);
        // then
        assertThat(firstCard.getColor()).isEqualTo(ColorValue.BLUE);
    }

    @Test
    void shouldChangeCardColor() {
        // given
        var card = createCard(1L, 0);
        card.setColor(ColorValue.BLUE);
        // when
        cardUpdater.changeCardColor(card, "#4FC1E8");
        // then
        ArgumentCaptor<Card> cardArgumentCaptor = ArgumentCaptor.forClass(Card.class);
        verify(cardRepository, atMostOnce()).saveAndFlush(cardArgumentCaptor.capture());
        assertThat(card.getColor()).isEqualTo(ColorValue.BLUE);
    }

    @Test
    void shouldMarkCardAsLocked() {
        // given
        var card = createCard(1L, 0);
        // when
        cardUpdater.markAsLocked(card);
        // then
        ArgumentCaptor<Card> cardArgumentCaptor = ArgumentCaptor.forClass(Card.class);
        verify(cardRepository, atMostOnce()).saveAndFlush(cardArgumentCaptor.capture());
        assertThat(card.isLocked()).isTrue();
    }

    @Test
    void shouldMarkCardAsUnLocked() {
        // given
        var card = createCard(1L, 0);
        card.setLocked(true);
        // when
        cardUpdater.markAsUnlocked(card);
        // then
        ArgumentCaptor<Card> cardArgumentCaptor = ArgumentCaptor.forClass(Card.class);
        verify(cardRepository, atMostOnce()).saveAndFlush(cardArgumentCaptor.capture());
        assertThat(card.isLocked()).isFalse();
    }

}
