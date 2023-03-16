package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.services.card.CardRepository;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CardReader {

    private final CardRepository cardRepository;

    public Card getCardById(Long id) {
        return cardRepository
                .findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("card", "Card with id: " + id + " does not exist!")
                );
    }

    public List<CardResponseDTO> getAllCardsByColumnId(Long columnId) {
        return cardRepository
                .findAllByColumnId(columnId)
                .stream()
                .map(Card::toDto)
                .toList();
    }

}
