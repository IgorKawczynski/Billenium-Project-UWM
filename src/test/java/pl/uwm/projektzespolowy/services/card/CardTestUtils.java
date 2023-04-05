package pl.uwm.projektzespolowy.services.card;

import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.color.ColorValue;
import pl.uwm.projektzespolowy.models.user.AvatarColor;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class CardTestUtils {

    public static Cell createCellWithCards() {
        var cell = new Cell();
        cell.setId(1L);
        var firstCard = createCardWithEveryField(1L, "title", "description", 0);
        var secondCard = createCardWithEveryField(2L, "title", "description", 1);
        var thirdCard = createCardWithEveryField(3L, "title", "description", 2);
        var fourthCard = createCardWithEveryField(4L, "title", "description", 3);
        var fifthCard = createCardWithEveryField(5L, "title", "description", 4);
        var cards = new ArrayList<>(Arrays.asList(firstCard, secondCard, thirdCard, fourthCard, fifthCard));
        cell.setCards(cards);
        return cell;
    }

    public static Card createCard(Long id, int position) {
        var card = new Card();
        card.setId(id);
        card.setPosition(new Position(position));
        return card;
    }

    public static Card newLockedCard(Long id, int position) {
        var card = createCardWithEveryField(id, "some title", "some description", position);
        card.setLocked(true);
        return card;
    }

    public static Card newUnlockedCard(Long id, int position) {
        var card = createCardWithEveryField(id, "some title", "some description", position);
        card.setLocked(false);
        return card;
    }

    public static Card cardWithAssignedUser(Long id, int position) {
        var card = createCard(id, position);
        var firstUser = createUser(1L);
        var assignedUser = Stream.of(firstUser).collect(Collectors.toCollection(HashSet::new));
        card.setAssignedUsers(assignedUser);
        return card;
    }

    public static Card createCardWithAssignedUsers(Long id, int position) {
        var card = createCard(id, position);
        var firstUser = createUser(1L);
        var secondUser = createUser(2L);
        var thirdUser = createUser(2L);
        var assignedUsers = Stream.of(firstUser, secondUser, thirdUser).collect(Collectors.toCollection(HashSet::new));
        card.setAssignedUsers(assignedUsers);
        return card;
    }

    public static User createUser(Long id) {
        var user = new User();
        user.setId(id);
        user.setAvatarColor(AvatarColor.APPLE_VALLEY);
        user.setCards(new HashSet<>());
        user.setEmail("some@nice.email");
        user.setBoards(new HashSet<>());
        user.setPassword("damnthatpasswordisstrong");
        user.setFirstName("testuser");
        user.setLastName("testuser");
        return user;
    }

    public static Card createCardWithEveryField(Long id, String title, String description, int position) {
        var createdCard = createCard(id, position);
        createdCard.setTitle(new Title(title));
        createdCard.setDescription(description);
        createdCard.setAssignedUsers(new HashSet<>());
        createdCard.setCheckboxes(new ArrayList<>());
        createdCard.setColor(ColorValue.BLUE);
        createdCard.setLocked(false);
        return createdCard;
    }

    public static Board createBoard(User user) {
        var board = new Board();
        board.setId(1L);
        board.setCreator(user);
        board.setRows(new ArrayList<>());
        board.setColumns(new ArrayList<>());
        board.setColors(new ArrayList<>());
        board.setWipLimit(3);
        board.setTitle(new Title("nice board"));
        return board;
    }

}
