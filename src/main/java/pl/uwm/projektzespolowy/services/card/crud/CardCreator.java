package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.card.CardRepository;

@Component
@RequiredArgsConstructor
public class CardCreator {

    private final CardRepository cardRepository;

    public Card create(String givenTitle, String description, Column column) {
        var title = new Title(givenTitle);
        return cardRepository.saveAndFlush(new Card(title, description, column, column.getPositionForNewCard()));
    }

}
