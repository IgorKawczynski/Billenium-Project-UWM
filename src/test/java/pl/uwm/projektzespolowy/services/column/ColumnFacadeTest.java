package pl.uwm.projektzespolowy.services.column;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.uwm.projektzespolowy.exceptions.BoardHasTooFewColumnsToDeleteException;
import pl.uwm.projektzespolowy.exceptions.ColumnCantBeDeletedException;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
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
        var columnToUpdate = new ColumnUpdateDTO(String.valueOf(columnCreated.getId()), "columnTestNewTitle", 5, false);
        // given
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

    @Test
    void deleteColumn() {
        // when
        var columnToCreate = new ColumnCreateDTO(
                String.valueOf(boardCreated.getId()),
                "columnTest");
        var columnCreated = columnFacade.createColumn(columnToCreate);
        var columns = new ArrayList<>(boardCreated.getColumns());
        columns.add(columnCreated);
        boardCreated.setColumns(columns);
        // given
        columnFacade.deleteColumn(columnCreated.getId());
        // then
        assertThatThrownBy(() -> columnFacade.getColumnById(columnCreated.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Column with id: " + columnCreated.getId() + " does not exist!");
    }

    @Test
    void shouldNotDeleteFirstOrLastColumn() {
        // when
        var columns = new ArrayList<>(boardCreated.getColumns());
        boardCreated.setColumns(columns);
        // then
        assertThatThrownBy(() -> columnFacade.deleteColumn(boardCreated.getColumns().get(0).getId()))
                .isInstanceOf(ColumnCantBeDeletedException.class)
                .hasMessage("First column can not be deleted.");
        assertThatThrownBy(() -> columnFacade.deleteColumn(boardCreated.getColumns().get(2).getId()))
                .isInstanceOf(ColumnCantBeDeletedException.class)
                .hasMessage("Last column can not be deleted.");
    }

    @Test
    void shouldNotDeleteColumnIfBoardHasNotAtLeastTwo() {
        var columns = new ArrayList<>(boardCreated.getColumns());
        boardCreated.setColumns(columns);
        // given
        columnFacade.deleteColumn(boardCreated.getColumns().get(1).getId());
        // then
        assertThatThrownBy(() -> columnFacade.deleteColumn(boardCreated.getColumns().get(0).getId()))
                .isInstanceOf(BoardHasTooFewColumnsToDeleteException.class)
                .hasMessage("Board must have at least two columns.");
    }

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