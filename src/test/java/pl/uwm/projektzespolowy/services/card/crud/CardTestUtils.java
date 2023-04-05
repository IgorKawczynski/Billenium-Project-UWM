package pl.uwm.projektzespolowy.services.card.crud;

import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CardTestUtils {

    public static Cell createCellWithCards() {
        var cell = new Cell();
        cell.setId(1L);
        cell.setCards(createCards());
        return cell;
    }

    public static ArrayList<Card> createCards() {
        var firstCard = createCard(1L, 0);
        var secondCard = createCard(2L, 1);
        var thirdCard = createCard(3L, 2);
        var fourthCard = createCard(4L, 3);
        var fifthCard = createCard(5L, 4);
        return new ArrayList<>(Arrays.asList(firstCard, secondCard, thirdCard, fourthCard, fifthCard));
    }

    public static Card createCard(Long id, int position) {
        var card = new Card();
        card.setId(id);
        card.setPosition(new Position(position));
        return card;
    }

    public static Card createCardWithAssignedUsers(Long id, int position) {
        var card = createCard(id, position);
        var firstUser = createUser(1L);
        var secondUser = createUser(2L);
        var assignedUsers = Stream.of(firstUser, secondUser).collect(Collectors.toCollection(HashSet::new));
        card.setAssignedUsers(assignedUsers);
        return card;
    }

    public static User createUser(Long id) {
        var user = new User();
        user.setId(id);
        return user;
    }
}
