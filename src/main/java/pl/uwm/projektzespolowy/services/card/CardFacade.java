package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.column.crud.ColumnCRUDService;

@Component
@RequiredArgsConstructor
public class CardFacade {

    private final CardCRUDService cardCRUDService;
    private final ColumnCRUDService columnCRUDService;
    private final CardMoverService cardMoverService;

    public Card getCardById(Long id) {
        return cardCRUDService.getCardById(id);
    }

    public CardResponseDTO addCardToColumn(CardCreateDTO cardCreateDTO) {
        return cardCRUDService.addCardToColumn(cardCreateDTO).toDto();
    }

    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO) {
        return cardCRUDService.updateCard(cardUpdateDTO).toDto();
    }

    public CardResponseDTO moveCardToAnotherColumn(CardMovedDTO cardMovedDTO) {
        var card = cardCRUDService.getCardById(Long.parseLong(cardMovedDTO.cardId()));
        var cardOldColumn = card.getColumn();
        var cardNewColumn = columnCRUDService.getColumnById(Long.parseLong(cardMovedDTO.newColumnId()));
        var changedCards = cardMoverService.moveCardToAnotherColumn(card, cardOldColumn, cardNewColumn, cardMovedDTO.newPosition());
        columnCRUDService.saveChanges(cardOldColumn);
        columnCRUDService.saveChanges(cardNewColumn);
        cardCRUDService.saveChanges(changedCards);
        return card.toDto();
    }

}
