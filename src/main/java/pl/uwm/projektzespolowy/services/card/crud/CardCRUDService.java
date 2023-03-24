package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.*;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class CardCRUDService {

    private final CardCreator cardCreator;
    private final CardReader cardReader;
    private final CardUpdater cardUpdater;
    private final CardDeleter cardDeleter;
    private final UserCRUDService userCRUDService;

    public Card getCardById(Long cardId) {
        return cardReader.getCardById(cardId);
    }

    public List<Card> getAllCardsByCellId(Long cellId) {
        return cardReader.getAllCardsByCellId(cellId);
    }

    public Set<User> getAllAssignedUsersToCard(Long cardId) {
        return cardReader.getAllAssignedUsersToCard(cardId);
    }

    public CardResponseDTO createCard(Cell cell, String title, String description) {
        return cardCreator.createCard(cell, title, description).toDto();
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

    public CardResponseDTO assignUserToCard(CardUserUpdateDTO cardUserUpdateDTO) {
        var cardId = Long.parseLong(cardUserUpdateDTO.cardId());
        var cardToChange = cardReader.getCardById(cardId);
        var userId = Long.parseLong(cardUserUpdateDTO.userId());
        var userToAssign = userCRUDService.getUserById(userId);
        return cardUpdater
                .assignUserToCard(cardToChange, userToAssign)
                .toDto();
    }

    public void deleteCard(Cell cell, Long cardId) {
        var cardToDelete = cardReader.getCardById(cardId);
        cardDeleter.deleteCard(cell, cardToDelete);
    }

    public void saveChangedCards(List<Card> cards) {
        cardUpdater.saveChangedCards(cards);
    }

    public void saveChangedCard(Card card) {
        cardUpdater.saveChangedCard(card);
    }

    public CardResponseDTO changeCardColor(CardColorChangeDTO cardColorChangeDTO) {
        var cardId = Long.parseLong(cardColorChangeDTO.cardId());
        var cardToChange = cardReader.getCardById(cardId);
        return cardUpdater.changeCardColor(cardToChange, cardColorChangeDTO.newColor()).toDto();
    }
}
