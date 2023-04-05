package pl.uwm.projektzespolowy.services.card.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static pl.uwm.projektzespolowy.services.card.crud.CardTestUtils.createCard;
import static pl.uwm.projektzespolowy.services.card.crud.CardTestUtils.createCellWithCards;

@ExtendWith(MockitoExtension.class)
public class CardReaderTest {

    @Mock
    private final CardRepository cardRepository = Mockito.mock(CardRepository.class);

    private CardReader cardReader;

    @BeforeEach
    void setUp() {
        cardReader = new CardReader(cardRepository);
    }

    @Test
    void shouldThrowEntityNotFoundException() {
        long notFoundId = -404L;
        // then
        assertThatThrownBy(() -> cardReader.getCardById(notFoundId))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Card with id: " + notFoundId + " does not exist!");
    }

    @Test
    void shouldReturnAllCards() {
        // given
        var cell = createCellWithCards();
        given(cardRepository.findAllByCellId(cell.getId())).willReturn(cell.getCards());
        // when
        var cards = cardReader.getAllCardsByCellId(cell.getId());
        // then
        assertThat(cards).hasSize(5);
    }

    @Test
    void shouldReturnCardById() {
        // given
        var card = createCard(1L, 0);
        given(cardRepository.findById(1L)).willReturn(Optional.of(card));
        // when
        var foundCard = cardReader.getCardById(1L);
        // then
        assertThat(foundCard).isNotNull();
    }
}
