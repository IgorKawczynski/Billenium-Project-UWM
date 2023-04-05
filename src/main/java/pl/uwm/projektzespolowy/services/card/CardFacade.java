package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.cell.crud.CellCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CardFacade {

    private final CardCRUDService cardCRUDService;
    private final CellCRUDService cellCRUDService;
    private final CardMoverService cardMoverService;
    private final BoardCRUDService boardCRUDService;
    private final UserCRUDService userCRUDService;

    public CardResponseDTO createCard(CardCreateDTO cardCreateDTO) {
        var cell = cellCRUDService.getCellById(Long.parseLong(cardCreateDTO.cellId()));
        return cardCRUDService
                .createCard(cell, cardCreateDTO.title(), cardCreateDTO.description())
                .toDto();
    }

    public CardResponseDTO getCardById(Long cardId) {
        return cardCRUDService
                .getCardById(cardId)
                .toDto();
    }

    public List<CardResponseDTO> getAllCardsByCellId(Long cellId) {
        return cardCRUDService
                .getAllCardsByCellId(cellId)
                .stream()
                .map(Card::toDto)
                .sorted(Comparator.comparingInt(CardResponseDTO::position))
                .toList();
    }

    public List<UserResponseDTO> getAllAssignedUsersToCard(Long cardId) {
        return cardCRUDService
                .getAllAssignedUsersToCard(cardId)
                .stream()
                .map(User::toDto)
                .sorted(Comparator.comparing(UserResponseDTO::firstName)
                        .thenComparing(UserResponseDTO::lastName))
                .collect(Collectors.toList());
    }

    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO) {
        var cardId = Long.parseLong(cardUpdateDTO.cardId());
        var newTitle = cardUpdateDTO.title();
        var newDescription = cardUpdateDTO.description();
        return cardCRUDService
                .updateCard(cardId, newTitle, newDescription)
                .toDto();
    }

    public CardResponseDTO markAsLocked(Long cardId) {
        return cardCRUDService.markAsLocked(cardId).toDto();
    }

    public CardResponseDTO markAsUnlocked(Long cardId) {
        return cardCRUDService.markAsUnlocked(cardId).toDto();
    }

    public CardResponseDTO assignUserToCard(CardUserUpdateDTO cardUserUpdateDTO) {
        var userToAssign = userCRUDService.getUserById(Long.parseLong(cardUserUpdateDTO.userId()));
        var cardId = Long.parseLong(cardUserUpdateDTO.cardId());
        var board = boardCRUDService.getBoardByCardId(cardId);
        var userAssignedCards = boardCRUDService.getAmountOfAssignedCardsToUser(userToAssign, board.getId());
        return cardCRUDService
                .assignUserToCard(cardId, userToAssign, board.getWipLimit(), userAssignedCards)
                .toDto();
    }

    public void deleteCard(Long cardId) {
        var cell = cardCRUDService.getCardById(cardId).getCell();
        cardCRUDService.deleteCard(cell, cardId);
    }

    public CardResponseDTO moveCard(MoveDTO cardMoveDTO) {
        var card = cardCRUDService.getCardById(Long.parseLong(cardMoveDTO.movedObjectId()));
        var changedCards = cardMoverService.moveCard(card, cardMoveDTO.newPosition());
        cardCRUDService.saveChangedCard(card);
        cardCRUDService.saveChangedCards(changedCards);
        return card.toDto();
    }

    public CardResponseDTO moveCardToAnotherCell(CardMoveToAnotherCellDTO cardMoveToAnotherCellDTO) {
        var card = cardCRUDService.getCardById(Long.parseLong(cardMoveToAnotherCellDTO.cardId()));
        var cardOldCell = card.getCell();
        var cardNewCell = cellCRUDService.getCellById(Long.parseLong(cardMoveToAnotherCellDTO.newCellId()));
        var changedCards = cardMoverService.moveCardToAnotherCell(card, cardOldCell, cardNewCell, cardMoveToAnotherCellDTO.newPosition());
        cardCRUDService.saveChangedCard(card);
        cardCRUDService.saveChangedCards(changedCards);
        return card.toDto();
    }

    public CardResponseDTO changeCardColor(CardColorChangeDTO cardColorChangeDTO) {
        var cardId = Long.parseLong(cardColorChangeDTO.cardId());
        return cardCRUDService
                .changeCardColor(cardId, cardColorChangeDTO.newColor())
                .toDto();
    }

    public CardResponseDTO deleteAssignedUserFromCard(CardUserUpdateDTO cardUserUpdateDTO) {
        var cardId = Long.parseLong(cardUserUpdateDTO.cardId());
        var userToDelete = userCRUDService.getUserById(Long.parseLong(cardUserUpdateDTO.userId()));
        return cardCRUDService
                .deleteAssignedUserFromCard(cardId, userToDelete)
                .toDto();
    }

}
