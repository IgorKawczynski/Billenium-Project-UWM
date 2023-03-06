package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.column.crud.ColumnCRUDService;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CardFacade {

    private final CardCRUDService cardCRUDService;
    private final ColumnCRUDService columnCRUDService;
    private final CardMoverService cardMoverService;

    public CardResponseDTO getCardById(Long id) {
        return cardCRUDService.getCardById(id).toDto();
    }

    public CardResponseDTO addCardToColumn(CardCreateDTO cardCreateDTO) {
        return cardCRUDService.addCardToColumn(cardCreateDTO);
    }

    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO) {
        return cardCRUDService.updateCard(cardUpdateDTO);
    }

    public List<CardResponseDTO> getAllCardsByColumnId(Long columnId) {
        return cardCRUDService.getAllCardsByColumnId(columnId);
    }

    public CardResponseDTO moveCardToAnotherColumn(CardMovedDTO cardMovedDTO) {
        var card = cardCRUDService.getCardById(Long.parseLong(cardMovedDTO.cardId()));
        var cardOldColumn = card.getColumn();
        var cardNewColumn = columnCRUDService.getColumnById(Long.parseLong(cardMovedDTO.newColumnId()));
        var changedCards = cardMoverService.moveCardToAnotherColumn(card, cardOldColumn, cardNewColumn, cardMovedDTO.newPosition());
        cardCRUDService.saveChangedCard(card);
        cardCRUDService.saveChangedCards(changedCards);
        return card.toDto();
    }

    public void deleteCard(Long cardId) {
        cardCRUDService.deleteCard(cardId);
    }

}
