package pl.uwm.projektzespolowy.services.card.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.color.ColorValue;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static pl.uwm.projektzespolowy.services.card.crud.CardTestUtils.*;

@ExtendWith(MockitoExtension.class)
public class CardCRUDServiceTest {

    private final CardCreator cardCreator = Mockito.mock(CardCreator.class);
    private final CardReader cardReader = Mockito.mock(CardReader.class);
    private final CardUpdater cardUpdater = Mockito.mock(CardUpdater.class);
    private final CardDeleter cardDeleter = Mockito.mock(CardDeleter.class);

    private CardCRUDService cardCRUDService;

    @BeforeEach
    void setUp() {
        cardCRUDService = new CardCRUDService(cardCreator, cardReader, cardUpdater, cardDeleter);
    }

    @Test
    void shouldReturnCardById() {
        // given
        var card = createCard(1L, 0);
        given(cardCRUDService.getCardById(1L)).willReturn(card);
        // when
        var foundCard = cardCRUDService.getCardById(1L);
        // then
        assertThat(foundCard.getId()).isEqualTo(card.getId());
    }

    @Test
    void shouldReturnAllCardsByCellId() {
        // given
        var cell = createCellWithCards();
        given(cardCRUDService.getAllCardsByCellId(cell.getId())).willReturn(cell.getCards());
        // when
        var cellCards = cardCRUDService.getAllCardsByCellId(cell.getId());
        // then
        assertThat(cellCards).hasSize(cell.getCards().size());
    }

    @Test
    void shouldReturnAllAssignedUsersToCard() {
        // given
        var card = createCardWithAssignedUsers(1L, 0);
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        var cardAssignedUsers = cardCRUDService.getAllAssignedUsersToCard(card.getId());
        // then
        assertThat(cardAssignedUsers).hasSize(2);
    }

    @Test
    void shouldCreateCard() {
        // given
        var cell = createCellWithCards();
        var title = "the beatles";
        var description = "yellow submarine";
        var card = new Card(new Title(title), description, cell, new Position(1));
        // when
        when(cardCreator.createCard(cell, title, description)).thenReturn(card);
        var createdCard = cardCRUDService.createCard(cell, title, description);
        // then
        assertThat(createdCard.getTitle().toString()).isEqualTo(card.getTitle().toString());
        assertThat(createdCard.getDescription()).isEqualTo(card.getDescription());
    }

    @Test
    void shouldUpdateCard() {
        // given
        var card = createCard(1L, 0);
        card.setTitle(new Title("my watches"));
        card.setDescription("some movies");
        var title = "watch list";
        var description = "dragon ball z";
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        when(cardUpdater.editCard(card, title, description)).thenReturn(new Card(new Title(title), description, null, null));
        var updatedCard = cardCRUDService.updateCard(1L, title, description);
        // then
        assertThat(updatedCard.getTitle().toString()).isEqualTo("watch list");
        assertThat(updatedCard.getDescription()).isEqualTo("dragon ball z");
    }

    @Test
    void shouldMarkCardAsLocked() {
        // given
        var card = createCard(1L, 0);
        card.setLocked(false);
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        when(cardUpdater.markAsLocked(card)).thenReturn(newLockedCard(1L, 0));
        var updatedCard = cardCRUDService.markAsLocked(1L);
        // then
        assertThat(updatedCard.isLocked()).isTrue();
    }

    @Test
    void shouldMarkCardAsUnlocked() {
        // given
        var card = createCard(1L, 0);
        card.setLocked(false);
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        when(cardUpdater.markAsUnlocked(card)).thenReturn(newUnlockedCard(1L, 0));
        var updatedCard = cardCRUDService.markAsUnlocked(1L);
        // then
        assertThat(updatedCard.isLocked()).isFalse();
    }

    @Test
    void shouldAssignUserToCard() {
        // given
        var user = createUser(1L);
        var card = createCard(1L, 0);
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        when(cardUpdater.assignUserToCard(card, user, 3, 1))
                .thenReturn(cardWithAssignedUser(1L, 0));
        var cardWithAssignedUser = cardCRUDService.assignUserToCard(1L, user, 3, 1);
        // then
        assertThat(cardWithAssignedUser.getAssignedUsers().size()).isEqualTo(1);
    }

    @Test
    void shouldDeleteCard() {
        // given
        var cell = createCellWithCards();
        var card = cell.getCards().get(0);
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        cardCRUDService.deleteCard(cell, card.getId());
        // then
        verify(cardDeleter).deleteCard(cell, card);
    }

    @Test
    void shouldDeleteAssignedUserFromCard() {
        // given
        var card = createCardWithAssignedUsers(1L, 0);
        var userToDelete = card.getAssignedUsers().stream().toList().get(0);
        var secondUser = createUser(2L);
        var assignedUsers = Stream.of(secondUser).collect(Collectors.toCollection(HashSet::new));
        var cardWithoutUserToDelete = createCard(1L, 0);
        cardWithoutUserToDelete.setAssignedUsers(assignedUsers);
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        when(cardDeleter.deleteAssignedUserFromCard(card, userToDelete)).thenReturn(cardWithoutUserToDelete);
        var cardWithOneUser = cardCRUDService.deleteAssignedUserFromCard(1L, userToDelete);
        // then
        assertThat(cardWithOneUser.getAssignedUsers()).hasSize(1);
    }

    @Test
    void shouldChangeCards() {
        // given
        var firstCard = createCard(1L, 0);
        var secondCard = createCard(2L, 1);
        var unchangedCards = new ArrayList<>(Arrays.asList(firstCard, secondCard));
        // when
        cardCRUDService.saveChangedCards(unchangedCards);
        // then
        verify(cardUpdater).saveChangedCards(unchangedCards);
    }

    @Test
    void shouldChangeCard() {
        // given
        var firstCard = createCard(1L, 0);
        // when
        cardCRUDService.saveChangedCard(firstCard);
        // then
        verify(cardUpdater).saveChangedCard(firstCard);
    }

    @Test
    void shouldChangeCardColor() {
        // given
        var card = createCard(1L, 0);
        card.setColor(ColorValue.BLUE);
        var cardWithChangedColor = createCard(1L, 0);
        cardWithChangedColor.setColor(ColorValue.GREEN);
        // when
        when(cardReader.getCardById(1L)).thenReturn(card);
        when(cardUpdater.changeCardColor(card,"#A0D568")).thenReturn(cardWithChangedColor);
        var cardWithNewColor = cardCRUDService.changeCardColor(1L, "#A0D568");
        // then
        assertThat(cardWithNewColor.getColor()).isEqualTo(ColorValue.GREEN);
    }

}
