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

    public List<CardResponseDTO> getAllCards() {
        return cardReader.getAllCards();
    }

    public Card getCardById(Long id) {
        return cardReader.getCardById(id);
    }

    public List<CardResponseDTO> getAllCardsByColumnId(Long columnId) {
        return cardReader.getAllCardsByColumnId(columnId);
    }

    public CardResponseDTO addCardToColumn(CardCreateDTO cardCreateDTO) {
        var columnId = Long.parseLong(cardCreateDTO.columnId());
        var column = columnReader.getColumnById(columnId);
        return cardCreator
                .create(
                        cardCreateDTO.title(),
                        cardCreateDTO.description(),
                        column
                )
                .toDto();
    }

    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO) {
        var cardId = Long.parseLong(cardUpdateDTO.cardId());
        var cardToChange = cardReader.getCardById(cardId);
        return cardUpdater
                .editCard(
                        cardToChange,
                        cardUpdateDTO.title(),
                        cardUpdateDTO.description(),
                        cardUpdateDTO.position()
                )
                .toDto();
    }

    public void deleteCard(Long cardId) {
        var card = cardReader.getCardById(cardId);
        cardDeleter.deleteCard(card);
    }

    public void saveChangedCards(List<Card> cards) {
        cardUpdater.saveChangedCards(cards);
    }

    public void saveChangedCard(Card card) {
        cardUpdater.saveChangedCard(card);
    }

}
