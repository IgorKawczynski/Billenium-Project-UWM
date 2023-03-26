package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.card.CardUserUpdateDTO;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.services.PositionableList;

import java.util.function.Predicate;

@Component
@RequiredArgsConstructor
class CardDeleter {

    private final CardRepository cardRepository;

    public void deleteCard(Cell cell, Card cardToDelete) {
        var cellCards = new PositionableList<>(cell.getCards());

        cellCards.withHigherOrEqualPositionThanGiven(cardToDelete);
        cellCards.moveLeftAll();
        cell.remove(cardToDelete);

        cardRepository.delete(cardToDelete);
        cardRepository.saveAll(cellCards.list());
    }

    public Card deleteAssignedUserFromCard(CardUserUpdateDTO cardUserUpdateDTO) {

        var cardId = Long.parseLong(cardUserUpdateDTO.cardId());
        var cardToChange = cardRepository
                .findById(cardId)
                .orElseThrow( () -> new EntityNotFoundException("card", "Card with id: " + cardId + " does not exist!"));;
        var userId = Long.parseLong(cardUserUpdateDTO.userId());

        Predicate<User> isThisUser = user -> user.getId() == userId;
        cardToChange.getAssignedUsers().removeIf(isThisUser);
        cardRepository.saveAndFlush(cardToChange);
        return cardToChange;
    }


}
