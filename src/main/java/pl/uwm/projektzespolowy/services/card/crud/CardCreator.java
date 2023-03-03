package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.card.CardRepository;
import pl.uwm.projektzespolowy.services.column.crud.ColumnReader;

@Component
@RequiredArgsConstructor
public class CardCreator {

    private final CardRepository cardRepository;
    private final ColumnReader columnReader;

    public Card create(String givenTitle, String description, Long columnId) {
        var column = columnReader.getColumnById(columnId);
        var title = new Title(givenTitle);
        return cardRepository.saveAndFlush(new Card(title, description, column));
    }

}
