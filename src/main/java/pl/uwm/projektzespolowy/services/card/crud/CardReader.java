package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.card.Card;

import java.util.List;

@Component
@RequiredArgsConstructor
class CardReader {

    private final CardRepository cardRepository;

    public Card getCardById(Long cardId) {
        return cardRepository.findById(cardId).orElseThrow(
                        () -> new EntityNotFoundException("card", "Card with id: " + cardId + " does not exist!")
                );
    }

    public List<Card> getAllCardsByCellId(Long cellId) {
        return cardRepository.findAllByCellId(cellId);
    }

}
