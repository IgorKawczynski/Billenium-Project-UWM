package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.card.CardRepository;

@Component
@RequiredArgsConstructor
public class CardUpdater {

    private final CardRepository cardRepository;

    // TODO -- positioning of tasks in columns
    public Card editCard(Card cardToChange, String givenTitle, String descrption, Integer position) {
        if (givenTitle != null) {
            cardToChange.setTitle(new Title(givenTitle));
        }
        if (descrption != null) {
            cardToChange.setDescription(descrption);
        }
        if (position != null) {
            cardToChange.setPosition(new Position(position));
        }
        return cardRepository.saveAndFlush(cardToChange);
    }

}
