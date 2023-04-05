package pl.uwm.projektzespolowy.services.card.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.services.PositionableList;

import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static pl.uwm.projektzespolowy.services.card.crud.CardTestUtils.*;

@ExtendWith(MockitoExtension.class)
public class CardDeleterTest {

    @Mock
    private final CardRepository cardRepository = Mockito.mock(CardRepository.class);

    private CardDeleter cardDeleter;

    @BeforeEach
    void setUp() {
        cardDeleter = new CardDeleter(cardRepository);
    }
    @Test
    void shouldDeleteCardAndMoveCardsLeft() {
        // given
        var cell = createCellWithCards();
        var cardToDelete = cell.getCards().get(2);
        var cellCards = new PositionableList<>(cell.getCards());
        // when
        cardDeleter.deleteCard(cell, cardToDelete);
        // then
        assertThat(cell.getCards()).hasSize(4);
        int lastPosition = cell.getCards().size() - 1;
        assertThat(cellCards.list()).hasSize(4);
        assertThat(cardToDelete).isNotIn(cell.getCards());
        assertThat(cardToDelete).isNotIn(cellCards);
        assertThat(cell.getCards().get(lastPosition).getPosition().value()).isEqualTo(3);
        assertThat(cell.getCards().get(lastPosition - 1).getPosition().value()).isEqualTo(2);
        assertThat(cell.getCards().get(lastPosition - 2).getPosition().value()).isEqualTo(1);
        assertThat(cell.getCards().get(lastPosition - 3).getPosition().value()).isEqualTo(0);
    }

    @Test
    void shouldDeleteAssignedUserFromCard() {
        // given
        var card = createCard(1L, 1);
        var firstUser = createUser(1L);
        var secondUser = createUser(2L);
        var assignedUsers = Stream.of(firstUser, secondUser).collect(Collectors.toCollection(HashSet::new));
        card.setAssignedUsers(assignedUsers);
        // when
        cardDeleter.deleteAssignedUserFromCard(card, firstUser);
        // then
        assertThat(card.getAssignedUsers()).containsOnly(secondUser);
        assertThat(firstUser).isNotIn(card.getAssignedUsers());
    }


}
