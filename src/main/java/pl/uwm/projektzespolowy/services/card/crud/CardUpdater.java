package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.card.CardRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CardUpdater {

    private final CardRepository cardRepository;

    public Card editCard(Card cardToChange, String givenTitle, String description, Integer position) {
        if (givenTitle != null) {
            cardToChange.setTitle(new Title(givenTitle));
        }
        if (description != null) {
            cardToChange.setDescription(description);
        }
        if (position != null) {
            cardToChange.setPosition(new Position(position));
        }
        return cardRepository.saveAndFlush(cardToChange);
    }

    public void saveChanges(List<Card> card) {
        cardRepository.saveAll(card);
    }

}
