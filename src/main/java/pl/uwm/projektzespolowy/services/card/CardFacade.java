package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.cell.crud.CellCRUDService;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CardFacade {

    private final CardCRUDService cardCRUDService;
    private final CellCRUDService cellCRUDService;
    private final CardMoverService cardMoverService;

    public CardResponseDTO createCard(CardCreateDTO cardCreateDTO) {
        var cell = cellCRUDService.getCellById(Long.parseLong(cardCreateDTO.cellId()));
        return cardCRUDService.createCard(cell, cardCreateDTO.title(), cardCreateDTO.description());
    }

    public CardResponseDTO getCardById(Long cardId) {
        return cardCRUDService.getCardById(cardId).toDto();
    }

    public List<CardResponseDTO> getAllCardsByCellId(Long cellId) {
        return cardCRUDService.getAllCardsByCellId(cellId)
                .stream().map(Card::toDto)
                .sorted(Comparator.comparingInt(CardResponseDTO::position))
                .toList();
    }

    public Set<UserResponseDTO> getAllAssignedUsersToCard(Long cardId) {
        return cardCRUDService
                .getAllAssignedUsersToCard(cardId)
                .stream()
                .map(User::toDto)
                .collect(Collectors.toSet());
    }

    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO) {
        return cardCRUDService.updateCard(cardUpdateDTO);
    }

    public CardResponseDTO assignUserToCard(CardUserUpdateDTO cardUserUpdateDTO) {
        return cardCRUDService.assignUserToCard(cardUserUpdateDTO);
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
        return cardCRUDService.changeCardColor(cardColorChangeDTO);
    }

}
