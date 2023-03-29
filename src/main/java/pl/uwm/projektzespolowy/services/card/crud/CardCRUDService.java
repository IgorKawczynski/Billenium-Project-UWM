package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.user.User;

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

    public List<Card> getAllCardsByCellId(Long cellId) {
        return cardReader.getAllCardsByCellId(cellId);
    }

    public List<User> getAllAssignedUsersToCard(Long cardId) {
        return cardReader.getCardById(cardId).getAssignedUsers().stream().toList();
    }

    public Card createCard(Cell cell, String title, String description) {
        return cardCreator.createCard(cell, title, description);
    }

    public Card updateCard(Long cardId, String newTitle, String newDescription) {
        var cardToChange = cardReader.getCardById(cardId);
        return cardUpdater.editCard(cardToChange, newTitle, newDescription);
    }

    public Card assignUserToCard(Long cardId, User userToAssign) {
        var card = cardReader.getCardById(cardId);
        return cardUpdater.assignUserToCard(card, userToAssign);
    }

    public void deleteCard(Cell cell, Long cardId) {
        var cardToDelete = cardReader.getCardById(cardId);
        cardDeleter.deleteCard(cell, cardToDelete);
    }

    public Card deleteAssignedUserFromCard(Long cardId, User userToDeleteFromCard) {
        var card = cardReader.getCardById(cardId);
        return cardDeleter.deleteAssignedUserFromCard(card, userToDeleteFromCard);
    }

    public void saveChangedCards(List<Card> cards) {
        cardUpdater.saveChangedCards(cards);
    }

    public void saveChangedCard(Card card) {
        cardUpdater.saveChangedCard(card);
    }

    public Card changeCardColor(Long cardId, String newColor) {
        var cardToChange = cardReader.getCardById(cardId);
        return cardUpdater.changeCardColor(cardToChange, newColor);
    }

}
