package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Component
@RequiredArgsConstructor
class CardCreator {

    private final CardRepository cardRepository;

    public Card createCard(Cell cell, String givenTitle, String description) {
        var title = new Title(givenTitle);
        return cardRepository
                .saveAndFlush(new Card(title, description, cell, cell.getPositionForNewCard()));
    }

}
