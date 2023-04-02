package pl.uwm.projektzespolowy.services.card.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
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

    public Card assignUserToCard(Card card, User userToAssign) {
        card.assignUser(userToAssign);
        return cardRepository.saveAndFlush(card);
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

}
