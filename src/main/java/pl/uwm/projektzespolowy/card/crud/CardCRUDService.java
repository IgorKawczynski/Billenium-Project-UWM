package pl.uwm.projektzespolowy.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.card.Card;
import pl.uwm.projektzespolowy.card.dtos.CardCreateDTO;

@Component
@RequiredArgsConstructor
public class CardCRUDService {

    private final CardCreator cardCreator;
    private final CardReader cardReader;
    private final CardUpdater cardUpdater;
    private final CardDeleter cardDeleter;

    public Card getCardById(Long id) {
        return cardReader.getCardById(id);
    }

    public Card addCardToColumn(CardCreateDTO cardCreateDTO) {
        return cardCreator.create(cardCreateDTO.title(), cardCreateDTO.description(), cardCreateDTO.columnId());
    }

}
