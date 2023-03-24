package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.user.User;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
class CardReader {

    private final CardRepository cardRepository;

    public Card getCardById(Long cardId) {
        return cardRepository
                .findById(cardId)
                .orElseThrow(
                        () -> new EntityNotFoundException("card", "Card with id: " + cardId + " does not exist!")
                );
    }

    public List<Card> getAllCardsByCellId(Long cellId) {
        return cardRepository.findAllByCellId(cellId);
    }

    public Set<User> getAllAssignedUsersToCard(Long cardId) {
        var x = cardRepository.findById(cardId).orElseThrow(() -> new EntityNotFoundException("card", "xd")).getAssignedUsers();
        return cardRepository.findById(cardId).orElseThrow(
                () -> new EntityNotFoundException("card", "Card with id: " + cardId + " does not exist!"))
                .getAssignedUsers();
    }

}
