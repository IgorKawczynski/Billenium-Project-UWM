package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.CardCantBeChildException;
import pl.uwm.projektzespolowy.exceptions.WipLimitExceededException;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.color.ColorValue;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.List;

@Component
@RequiredArgsConstructor
class CardUpdater {

    private final CardRepository cardRepository;

    public Card editCard(Card cardToChange, String givenTitle, String description) {
        if (givenTitle != null) {
            cardToChange.setTitle(new Title(givenTitle));
        }
        if (description != null) {
            cardToChange.setDescription(description);
        }
        return cardRepository.saveAndFlush(cardToChange);
    }

    public Card assignUserToCard(Card card, User userToAssign, Integer wipLimit, Integer userAssignedCards) {
        if (isWipLimitExceeded(userAssignedCards, wipLimit)) {
            throw new WipLimitExceededException(String.format("User has reached the assignment limit (%d).", wipLimit));
        }
        card.assignUser(userToAssign);
        return cardRepository.saveAndFlush(card);
    }

    private boolean isWipLimitExceeded(Integer amountOfUserAssignedCards, Integer boardWipLimit) {
        return boardWipLimit - amountOfUserAssignedCards <= 0;
    }
    public void saveChangedCards(List<Card> cards) {
        cardRepository.saveAll(cards);
    }

    public void saveChangedCard(Card card) {
        cardRepository.saveAndFlush(card);
    }

    public Card changeCardColor(Card cardToChange, String newColor) {
        var colorValue = ColorValue.getColorValue(newColor);
        cardToChange.setColor(colorValue);
        return cardRepository.saveAndFlush(cardToChange);
    }

    public Card markAsLocked(Card cardToChange) {
        cardToChange.setLocked(true);
        return cardRepository.saveAndFlush(cardToChange);
    }

    public Card markAsUnlocked(Card cardToChange) {
        cardToChange.setLocked(false);
        return cardRepository.saveAndFlush(cardToChange);
    }

    public Card addChild(Card parent, Card child) {
        if (!canBeChild(child)) {
            throw new CardCantBeChildException("This card can't be child because already has children.");
        }
        if (!areFromTheSameBoard(parent, child)) {
            throw new CardCantBeChildException("Those cards are not from the same board.");
        }
        child.setParentCardId(parent.getId());
        return cardRepository.saveAndFlush(child);
    }

    public Card removeChild(Card child) {
        child.setParentCardId(null);
        return cardRepository.saveAndFlush(child);
    }

    private boolean canBeChild(Card child) {
        var listOfChildren = cardRepository.getCardChildren(child.getId());
        return listOfChildren == null || listOfChildren.isEmpty();
    }

    private boolean areFromTheSameBoard(Card one, Card two) {
        var idOne = one.getCell().getColumn().getBoard().getId();
        var idTwo = two.getCell().getColumn().getBoard().getId();
        return idOne.equals(idTwo);
    }

}
