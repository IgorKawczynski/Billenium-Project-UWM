package pl.uwm.projektzespolowy.services.card.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static pl.uwm.projektzespolowy.services.card.crud.CardTestUtils.createCard;
import static pl.uwm.projektzespolowy.services.card.crud.CardTestUtils.createCellWithCards;

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

}
