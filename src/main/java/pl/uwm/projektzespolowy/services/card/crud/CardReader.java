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

    public Card getCardById(Long id) {
        return cardRepository
                .findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("card", "Card with id: " + id + " does not exist!")
                );
    }

    public List<Card> getAllCardsByColumnId(Long columnId) {
        return cardRepository.findAllByColumnId(columnId);
    }

}
