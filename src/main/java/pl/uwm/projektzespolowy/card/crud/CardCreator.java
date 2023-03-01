package pl.uwm.projektzespolowy.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.card.Card;
import pl.uwm.projektzespolowy.card.CardRepository;
import pl.uwm.projektzespolowy.column.crud.ColumnReader;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.StringValidatorException;

@Component
@RequiredArgsConstructor
public class CardCreator {

    private final CardRepository cardRepository;
    private final ColumnReader columnReader;

    public Card create(String title, String description, Long columnId) {
        validate(title);
        var column = columnReader.getColumnById(columnId);
        return cardRepository.saveAndFlush(new Card(title, description, column));
    }

    public void validate(String title) {
        if(title == null || title.isEmpty()) {
            throw new StringValidatorException("Title can not be empty!");
        }
    }

}
