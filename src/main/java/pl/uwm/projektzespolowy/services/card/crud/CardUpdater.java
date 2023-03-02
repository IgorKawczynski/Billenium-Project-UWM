package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.services.card.CardRepository;

@Component
@RequiredArgsConstructor
public class CardUpdater {

    private final CardRepository cardRepository;
    private final CardReader cardReader;

    public Card editCard(Long cardId, String title, String descrption) {
        var cardToChange = cardReader.getCardById(cardId);
        // TODO: change validation to check if title is valid, using TitleVO validation
        if (title != null) {
            cardToChange.setTitle(title);
        }
        if (descrption != null) {
            cardToChange.setDescription(descrption);
        }
        return cardRepository.saveAndFlush(cardToChange);
    }

}
