package pl.uwm.projektzespolowy.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.card.CardRepository;

@Component
@RequiredArgsConstructor
public class CardDeleter {

    private final CardRepository cardRepository;
    private final CardReader cardReader;

    // just for tests, TODO: add changes in other cards positions
    public void deleteCardById(Long id) {
        var card = cardReader.getCardById(id);
        cardRepository.delete(card);
    }

}
