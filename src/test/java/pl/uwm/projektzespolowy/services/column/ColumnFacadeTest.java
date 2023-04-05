package pl.uwm.projektzespolowy.services.column;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.InvalidTitleLengthException;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.column.ColumnCreateDTO;
import pl.uwm.projektzespolowy.models.column.ColumnUpdateDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.services.board.BoardFacade;
import pl.uwm.projektzespolowy.services.user.UserFacade;

import javax.transaction.Transactional;

import java.util.ArrayList;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Transactional
class ColumnFacadeTest {

    private final ColumnFacade columnFacade;
    private final BoardFacade boardFacade;
    private final UserFacade userFacade;
    private User userCreated;
    private Board boardCreated;

    @BeforeEach
    void createUserAndBoardForColumn() {
        var userToCreate = new UserCreateDTO("emailColumnTest@op.pl",
                "Column",
                "ColumnTest",
                "passwordColumnTest");
        userCreated = userFacade.createUser(userToCreate);

        var boardToCreate = new BoardCreateDTO(
                String.valueOf(userCreated.getId()),
                "ColumnTest");
        boardCreated = boardFacade.createBoard(boardToCreate);
    }

    @Test
    void shouldCreateNewColumnOnSecondLastPosition() {
        // when
        var columnToCreate = new ColumnCreateDTO(
                String.valueOf(boardCreated.getId()),
                "columnTest");
        // given
        var columnCreated = columnFacade.createColumn(columnToCreate);
        var columns = new ArrayList<>(boardCreated.getColumns());
        columns.add(columnCreated);
        boardCreated.setColumns(columns);
        // then
        assertThat(boardCreated.getColumns().size())
                .isEqualTo(4);
        assertThat(columnCreated.getPosition().value())
                .isEqualTo(2);
    }

    @Test
    void shouldNotCreateNewColumnAndThrowTitleLengthException() {
        // when
        var columnToCreate = new ColumnCreateDTO(
                String.valueOf(boardCreated.getId()),
                "CO");
        // then
        assertThatThrownBy(() -> columnFacade.createColumn(columnToCreate))
                .isInstanceOf(InvalidTitleLengthException.class)
                .hasMessage("Title must contain between 3 to 45 characters length.");
    }

    @Test
    void shouldReturnNewColumnsTitle() {
        // when
        var columnToCreate = new ColumnCreateDTO(
                String.valueOf(boardCreated.getId()),
                "columnTest");
        // given
        var columnCreated = columnFacade.createColumn(columnToCreate);
        var column = columnFacade.getColumnById(columnCreated.getId());
        // then
        assertThat(column.title()).isEqualTo("columnTest");
    }

    @Test
    void shouldUpdatedColumnHaveNewTitleWithCardsLimit() {
        // when
        var columnToCreate = new ColumnCreateDTO(
                String.valueOf(boardCreated.getId()),
                "columnTest");
        var columnCreated = columnFacade.createColumn(columnToCreate);
        // given
        var columnToUpdate = new ColumnUpdateDTO(String.valueOf(columnCreated.getId()), "columnTestNewTitle", 5, false);
        columnFacade.updateColumn(columnToUpdate);
        // then
        assertThat(
                columnFacade
                        .getColumnById(Long.parseLong(columnToUpdate.columnId()))
                        .title()
        )
                .isEqualTo("columnTestNewTitle");
        assertThat(
                columnFacade
                        .getColumnById(Long.parseLong(columnToUpdate.columnId()))
                        .cardsLimit()
        )
                .isEqualTo(5);
    }

    // TODO -- do poprawy połączenie z cells i cards (inicjacja całej tablicy z columns, cells, cards i wtedy usuwanie)
//    @Test
//    void deleteColumn() {
//        // when
//        var columnToCreate = new ColumnCreateDTO(
//                String.valueOf(boardCreated.getId()),
//                "columnTest");
//        var columnCreated = columnFacade.createColumn(columnToCreate);
//
//        var columns = new ArrayList<>(boardCreated.getColumns());
//        columns.add(columnCreated);
//        boardCreated.setColumns(columns);
//
//        var cellToCreate = new Cell(columnCreated, new Position(0));
//        var cellToCreate2 = new Cell(columnCreated, new Position(1));
//        var cells = new ArrayList<>(columnCreated.getCells());
//        cells.add(cellToCreate);
//        cells.add(cellToCreate2);
//        columnCreated.setCells(cells);
//
//        var cardToCreate1 = new Card(
//                new Title("columnDeleteTest"),
//                "test for deleting column",
//                columnCreated.getCells().get(0),
//                Position.first()
//        );
//
//        var cardToCreate2 = new Card(
//                new Title("columnDeleteTest"),
//                "test for deleting column",
//                columnCreated.getCells().get(1),
//                Position.first()
//        );
//
//        var cardToCreate3 = new Card(
//                new Title("columnDeleteTest"),
//                "test for deleting column",
//                columnCreated.getCells().get(2),
//                Position.first()
//        );
//
//        var cardToCreate4 = new Card(
//                new Title("columnDeleteTest"),
//                "test for deleting column",
//                columnCreated.getCells().get(2),
//                Position.second()
//        );
//
//        var cards1 = new ArrayList<>(List.of(cardToCreate1));
//        var cards2 = new ArrayList<>(List.of(cardToCreate2));
//        var cards3 = new ArrayList<>(List.of(cardToCreate3, cardToCreate4));
//
//
//        columnCreated.getCells().get(0).setCards(cards1);
//        columnCreated.getCells().get(1).setCards(cards2);
//        columnCreated.getCells().get(2).setCards(cards3);

        // given
//        columnFacade.deleteColumn(columnCreated.getId());
//        // then
//        assertThatThrownBy(() -> columnFacade.getColumnById(columnCreated.getId()))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Column with id: " + columnCreated.getId() + "does not exist!");
//    }

    @Test
    void moveColumn() {
        // when
        var columnToCreate = new ColumnCreateDTO(
                String.valueOf(boardCreated.getId()),
                "columnTest");
        var columnCreated = columnFacade.createColumn(columnToCreate);
        // given
        columnFacade.moveColumn(new MoveDTO(String.valueOf(columnCreated.getId()), 0));
        // then
        assertThat(columnFacade.getColumnById(columnCreated.getId()).position()).isEqualTo(0);
    }

    @AfterEach
    void deleteUserAndBoard() {
        boardFacade.deleteBoard(boardCreated.getId());
        userFacade.deleteUser(userCreated.getId());
    }
}