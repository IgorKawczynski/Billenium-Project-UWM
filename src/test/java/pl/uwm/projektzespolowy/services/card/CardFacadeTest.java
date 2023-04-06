package pl.uwm.projektzespolowy.services.card;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.cell.crud.CellCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.HashSet;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static pl.uwm.projektzespolowy.services.card.CardTestUtils.*;

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
        Card createdCard = createCardWithEveryField(1L, title, description, 0);
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
        var card = createCardWithEveryField(1L, title, description, 0);
        // when
        when(cardCRUDService.getCardById(cardId)).thenReturn(card);
        var foundCard = cardFacade.getCardById(cardId);
        // then
        assertThat(foundCard.id()).isEqualTo(cardId.toString());
        assertThat(foundCard.title()).isEqualTo(title);
        assertThat(foundCard.description()).isEqualTo(description);
    }

    @Test
    void shouldGetAllCardsByCellId() {
        // given
        var cell = createCellWithCards();
        // when
        when(cardCRUDService.getAllCardsByCellId(cell.getId())).thenReturn(cell.getCards());
        var cellCards = cardFacade.getAllCardsByCellId(cell.getId());
        // then
        assertThat(cellCards).hasSize(5);
    }

    @Test
    void shouldReturnAllAssignedUsersToCard() {
        // given
        var card = createCardWithAssignedUsers(1L, 0);
        // when
        when(cardCRUDService.getAllAssignedUsersToCard(card.getId())).thenReturn(card.getAssignedUsers().stream().toList());
        var assignedUsers = cardFacade.getAllAssignedUsersToCard(card.getId());
        // then
        assertThat(assignedUsers).hasSize(3);
        assertThat(assignedUsers.stream().findAny().get()).isInstanceOf(UserResponseDTO.class);
    }

    @Test
    void shouldUpdateCard() {
        // given
        Long cardId = 1L;
        var newTitle = "some nice title";
        var newDescription = "some good description here";
        var cardUpdateDTO = new CardUpdateDTO(cardId.toString(), newTitle, newDescription);
        var card = createCardWithEveryField(cardId, newTitle, newDescription, 0);
        // when
        when(cardCRUDService.updateCard(cardId, newTitle, newDescription)).thenReturn(card);
        var updatedCard = cardFacade.updateCard(cardUpdateDTO);
        // then
        assertThat(updatedCard.id()).isEqualTo("1");
        assertThat(updatedCard.title()).isEqualTo("some nice title");
        assertThat(updatedCard).isInstanceOf(CardResponseDTO.class);
    }

    @Test
    void shouldMarkCardAsLocked() {
        // given
        Long cardId = 1L;
        // when
        var card = newLockedCard(cardId, 0);
        when(cardCRUDService.markAsLocked(cardId)).thenReturn(card);
        var lockedCard = cardFacade.markAsLocked(cardId);
        // then
        assertThat(lockedCard.isLocked()).isTrue();
    }

    @Test
    void shouldMarkCardAsUnlocked() {
        // when
        var card = newUnlockedCard(1L, 0);
        when(cardCRUDService.markAsUnlocked(1L)).thenReturn(card);
        var lockedCard = cardFacade.markAsUnlocked(1L);
        // then
        assertThat(lockedCard.isLocked()).isFalse();
    }

    @Test
    void shouldAssignUserToCard() {
        // given
        var cardUserUpdateDTO = new CardUserUpdateDTO("1", "1");
        var card = createCardWithEveryField(1L, "some title", "some description", 0);
        var userToAssign = createUser(1L);
        var board = createBoard(userToAssign);
        var assignedUser = userToAssign;
        HashSet<Board> userBoards = new HashSet<>();
        userBoards.add(board);
        assignedUser.setBoards(userBoards);
        HashSet<User> assignedUsers = new HashSet<>();
        assignedUsers.add(assignedUser);
        card.setAssignedUsers(assignedUsers);
        // when
        when(userCRUDService.getUserById(1L)).thenReturn(userToAssign);
        when(boardCRUDService.getBoardByCardId(card.getId())).thenReturn(board);
        when(boardCRUDService.getAmountOfAssignedCardsToUser(userToAssign, board.getId())).thenReturn(0);
        when(cardCRUDService.assignUserToCard(card.getId(), userToAssign, board.getWipLimit(), 0)).thenReturn(card);
        var cardDTO = cardFacade.assignUserToCard(cardUserUpdateDTO);
        // then
        assertThat(cardDTO.assignedUsers()).hasSize(1);
        assertThat(cardDTO).isInstanceOf(CardResponseDTO.class);
    }

}
