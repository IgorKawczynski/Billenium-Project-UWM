package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.card.Card;

import java.util.List;

@Component
@RequiredArgsConstructor
class CardReader {

    private final CardRepository cardRepository;

    public Card getCardById(Long cardId) {
        return cardRepository.findById(cardId).orElseThrow(
                        () -> new EntityNotFoundException("card", "Card with id: " + cardId + " does not exist!")
        );
    }

    public List<Card> getAllCardsByCellId(Long cellId) {
        return cardRepository.findAllByCellId(cellId);
    }

    public List<Card> getCardChildren(Long parentId) {
        return cardRepository.getCardChildren(parentId);
    }

    public List<Card> getAllCardsInBoardWithoutParentAndChildren(Long boardId, Long parentId) {
        var cardsWithoutParent = cardRepository.getAllCardsInBoardWithoutParent(boardId, parentId);
        return cardsWithoutParent.stream()
                .filter(card -> card.getChildren(card.getCell().getColumn().getBoard()).isEmpty())
                .toList();
    }

}
