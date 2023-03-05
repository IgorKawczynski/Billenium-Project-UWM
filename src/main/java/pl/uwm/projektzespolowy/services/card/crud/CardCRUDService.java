package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.card.CardCreateDTO;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.card.CardUpdateDTO;
import pl.uwm.projektzespolowy.services.column.crud.ColumnReader;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CardCRUDService {

    private final CardCreator cardCreator;
    private final CardReader cardReader;
    private final CardUpdater cardUpdater;
    private final CardDeleter cardDeleter;
    private final ColumnReader columnReader;

    public CardResponseDTO getCardById(Long id) {
        return cardReader.getCardById(id).toDto();
    }

    public List<CardResponseDTO> getAllCards() {
        return cardReader.getAllCards();
    }


    public Card addCardToColumn(CardCreateDTO cardCreateDTO) {
        var column = columnReader.getColumnById(cardCreateDTO.columnId());
        return cardCreator.create(cardCreateDTO.title(), cardCreateDTO.description(), column);
    }

    public Card updateCard(CardUpdateDTO cardUpdateDTO) {
        var cardToChange = cardReader.getCardById(cardUpdateDTO.cardId());
        return cardUpdater.editCard(cardToChange, cardUpdateDTO.title(), cardUpdateDTO.description());
    }

}
