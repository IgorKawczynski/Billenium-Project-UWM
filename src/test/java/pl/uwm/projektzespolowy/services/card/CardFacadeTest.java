package pl.uwm.projektzespolowy.services.card;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.card.CardCreateDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.cell.crud.CellCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static pl.uwm.projektzespolowy.services.card.CardTestUtils.createCardWithEveryField;
import static pl.uwm.projektzespolowy.services.card.CardTestUtils.createCellWithCards;

@ExtendWith(MockitoExtension.class)
public class CardFacadeTest {

    private final CardCRUDService cardCRUDService = Mockito.mock(CardCRUDService.class);
    private final CardMoverService cardMoverService = Mockito.mock(CardMoverService.class);
    private final CellCRUDService cellCRUDService = Mockito.mock(CellCRUDService.class);
    private final BoardCRUDService boardCRUDService = Mockito.mock(BoardCRUDService.class);
    private final UserCRUDService userCRUDService = Mockito.mock(UserCRUDService.class);

    private CardFacade cardFacade;

    @BeforeEach
    void setUp() {
        cardFacade = new CardFacade(cardCRUDService, cellCRUDService, cardMoverService, boardCRUDService, userCRUDService);
    }

    @Test
    void shouldCreateCard() {
        // given
        var cellId = "1";
        var title = "card title";
        var description = "card description";
        var cardCreateDTO = new CardCreateDTO(cellId, title, description);
        var cell = createCellWithCards();
        Card createdCard = createCardWithEveryField(title, description);
        // when
        when(cellCRUDService.getCellById(Long.parseLong(cellId))).thenReturn(cell);
        when(cardCRUDService.createCard(cell, title, description)).thenReturn(createdCard);
        var createdCardDTO = cardFacade.createCard(cardCreateDTO);
        // then
        assertThat(createdCardDTO.title()).isEqualTo(title);
        assertThat(createdCardDTO.description()).isEqualTo(description);
    }

    @Test
    void shouldReturnCardById() {
        // given
        Long cardId = 1L;
        var title = "card title";
        var description = "card description";
        var card = createCardWithEveryField(title, description);
        // when
        when(cardCRUDService.getCardById(cardId)).thenReturn(card);
        var foundCard = cardFacade.getCardById(cardId);
        // then
        assertThat(foundCard.id()).isEqualTo(cardId.toString());
        assertThat(foundCard.title()).isEqualTo(title);
        assertThat(foundCard.description()).isEqualTo(description);
    }

//    @Test
//    void shouldGetAllCardsByCellId() {
//        // given
//        var cell = createCellWithCards();
//        // when
//        when(cardCRUDService.getAllCardsByCellId(cell.getId())).thenReturn(cell.getCards());
//        var cellCards = cardFacade.getAllCardsByCellId(cell.getId());
//        // then
//        assertThat(cellCards).hasSize(5);
//    }


}
