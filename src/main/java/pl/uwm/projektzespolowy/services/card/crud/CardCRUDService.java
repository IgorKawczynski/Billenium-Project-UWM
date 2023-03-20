package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.card.CardUpdateDTO;
import pl.uwm.projektzespolowy.models.column.Column;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CardCRUDService {

    private final CardCreator cardCreator;
    private final CardReader cardReader;
    private final CardUpdater cardUpdater;
    private final CardDeleter cardDeleter;

    public Card getCardById(Long cardId) {
        return cardReader.getCardById(cardId);
    }

    public List<Card> getAllCardsByColumnId(Long columnId) {
        return cardReader.getAllCardsByColumnId(columnId);
    }

    public CardResponseDTO createCard(Column column, String title, String description) {
        return cardCreator.createCard(column, title, description).toDto();
    }

    public CardResponseDTO updateCard(CardUpdateDTO cardUpdateDTO) {
        var cardId = Long.parseLong(cardUpdateDTO.cardId());
        var cardToChange = cardReader.getCardById(cardId);
        return cardUpdater
                .editCard(
                        cardToChange,
                        cardUpdateDTO.title(),
                        cardUpdateDTO.description()
                )
                .toDto();
    }

    public void deleteCard(Column column, Long cardId) {
        var cardToDelete = cardReader.getCardById(cardId);
        cardDeleter.deleteCard(column, cardToDelete);
    }

    public void saveChangedCards(List<Card> cards) {
        cardUpdater.saveChangedCards(cards);
    }

    public void saveChangedCard(Card card) {
        cardUpdater.saveChangedCard(card);
    }

}
