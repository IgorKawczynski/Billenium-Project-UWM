package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.column.crud.ColumnCRUDService;

import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CardFacade {

    private final CardCRUDService cardCRUDService;
    private final ColumnCRUDService columnCRUDService;
    private final CardMoverService cardMoverService;

    public CardResponseDTO createCard(CardCreateDTO cardCreateDTO) {
        var column = columnCRUDService.getColumnById(Long.parseLong(cardCreateDTO.columnId()));
        return cardCRUDService.createCard(column, cardCreateDTO.title(), cardCreateDTO.description());
    }

    public CardResponseDTO getCardById(Long cardId) {
        return cardCRUDService.getCardById(cardId).toDto();
    }

    public List<CardResponseDTO> getAllCardsByColumnId(Long columnId) {
        return cardCRUDService.getAllCardsByColumnId(columnId)
                .stream().map(Card::toDto)
                .sorted(Comparator.comparingInt(CardResponseDTO::position))
                .toList();
    }

    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO) {
        return cardCRUDService.updateCard(cardUpdateDTO);
    }

    public void deleteCard(Long cardId) {
        var column = cardCRUDService.getCardById(cardId).getColumn();
        cardCRUDService.deleteCard(column, cardId);
    }

    public CardResponseDTO moveCard(MoveDTO cardMoveDTO) {
        var card = cardCRUDService.getCardById(Long.parseLong(cardMoveDTO.movedObjectId()));
        var changedCards = cardMoverService.moveCard(card, cardMoveDTO.newPosition());
        cardCRUDService.saveChangedCard(card);
        cardCRUDService.saveChangedCards(changedCards);
        return card.toDto();
    }

    public CardResponseDTO moveCardToAnotherColumn(CardMoveToAnotherColumnDTO cardMoveToAnotherColumnDTO) {
        var card = cardCRUDService.getCardById(Long.parseLong(cardMoveToAnotherColumnDTO.cardId()));
        var cardOldColumn = card.getColumn();
        var cardNewColumn = columnCRUDService.getColumnById(Long.parseLong(cardMoveToAnotherColumnDTO.newColumnId()));
        var changedCards = cardMoverService.moveCardToAnotherColumn(card, cardOldColumn, cardNewColumn, cardMoveToAnotherColumnDTO.newPosition());
        cardCRUDService.saveChangedCard(card);
        cardCRUDService.saveChangedCards(changedCards);
        return card.toDto();
    }

}
