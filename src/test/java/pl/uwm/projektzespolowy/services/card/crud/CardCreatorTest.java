package pl.uwm.projektzespolowy.services.card.crud;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.uwm.projektzespolowy.models.card.Card;

import static org.mockito.Mockito.atMostOnce;
import static org.mockito.Mockito.verify;
import static pl.uwm.projektzespolowy.services.card.crud.CardTestUtils.createCellWithCards;

@ExtendWith(MockitoExtension.class)
public class CardCreatorTest {

    @Mock
    private final CardRepository cardRepository = Mockito.mock(CardRepository.class);

    private CardCreator cardCreator;
    @BeforeEach
    void setUp() {
        cardCreator = new CardCreator(cardRepository);
    }

    @Test
    void shouldCreateCard() {
        // given
        var cell = createCellWithCards();
        var cardTitle = "egg for breakfast";
        var description = "eat them";
        // when
        cardCreator.createCard(cell, cardTitle, description);
        // then
        ArgumentCaptor<Card> cardArgumentCaptor = ArgumentCaptor.forClass(Card.class);
        verify(cardRepository, atMostOnce()).saveAndFlush(cardArgumentCaptor.capture());
    }
}
