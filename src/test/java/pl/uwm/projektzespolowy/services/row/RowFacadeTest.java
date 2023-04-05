package pl.uwm.projektzespolowy.services.row;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.uwm.projektzespolowy.exceptions.BoardHasTooFewRowsToDeleteException;
import pl.uwm.projektzespolowy.exceptions.RowCantBeDeletedException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.row.RowCreateDTO;
import pl.uwm.projektzespolowy.models.row.RowUpdateDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.services.board.BoardFacade;
import pl.uwm.projektzespolowy.services.user.UserFacade;

import javax.transaction.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Transactional
class RowFacadeTest {
    private final RowFacade rowFacade;
    private final BoardFacade boardFacade;
    private final UserFacade userFacade;
    private User userCreated;
    private Board boardCreated;

    @BeforeEach
    void createUserAndBoardForRow() {
        var userToCreate = new UserCreateDTO("emailRowTest@op.pl",
                "Row",
                "RowTest",
                "passwordRowTest");
        userCreated = userFacade.createUser(userToCreate);

        var boardToCreate = new BoardCreateDTO(
                String.valueOf(userCreated.getId()),
                "rowTest");
        boardCreated = boardFacade.createBoard(boardToCreate);
    }

    @Test
    void shouldNewlyCreatedRowBeOnFirstPosition() {
        // when
        var rowToCreate = new RowCreateDTO(
                String.valueOf(boardCreated.getId()),
                "rowTest");
        // given
        var rowCreated = rowFacade.createRow(rowToCreate);
        // then
        assertThat(rowCreated.getPosition().value()).isEqualTo(0);
    }

    @Test
    void shouldGetRowById() {
        // when
        var rowToCreate = new RowCreateDTO(
                String.valueOf(boardCreated.getId()),
                "rowTest");
        // given
        var rowCreated = rowFacade.createRow(rowToCreate);
        var rowToGet = rowFacade.getRowById(rowCreated.getId());
        // then
        assertThat(rowToGet.title()).isEqualTo("rowTest");
    }

    @Test
    void shouldGetAllRowsByBoardId() {
        // when
        var rowToCreate = new RowCreateDTO(
                String.valueOf(boardCreated.getId()),
                "rowTest");
        // given
        var rowCreated = rowFacade.createRow(rowToCreate);
        var rowsToGet = rowFacade.getAllRowsByBoardId(boardCreated.getId());
        // then
        assertThat(rowsToGet.size()).isEqualTo(2);
    }

    @Test
    void shouldUpdateRowWithNewTitle() {
        // when
        var rowToCreate = new RowCreateDTO(
                String.valueOf(boardCreated.getId()),
                "rowTest");
        // given
        var rowCreated = rowFacade.createRow(rowToCreate);
        var rowToUpdate = new RowUpdateDTO(
                String.valueOf(rowCreated.getId()),
                "rowTestNewTitle");
        var rowUpdated = rowFacade.updateRow(rowToUpdate);
        // then
        assertThat(rowUpdated.title()).isEqualTo("rowTestNewTitle");
    }

    // TODO -- do poprawy połączenie z cells i cards (inicjacja całej tablicy z columns, rows, cells, cards i wtedy usuwanie)
//    @Test
//    void shouldDeleteRowWhenBoardHasMoreThanOne() {
//        // when
//        var rowToCreate1 = new RowCreateDTO(
//                String.valueOf(boardCreated.getId()),
//                "rowTest1");
//        var rowToCreate2 = new RowCreateDTO(
//                String.valueOf(boardCreated.getId()),
//                "rowTest2");
//        var rowCreated1 = rowFacade.createRow(rowToCreate1);
//        var rowCreated2 = rowFacade.createRow(rowToCreate2);
//        var rows = new ArrayList<>(boardCreated.getRows());
//        rows.add(rowCreated1);
//        rows.add(rowCreated2);
//        boardCreated.setRows(rows);
//        // given
//        rowFacade.deleteRow(rowCreated2.getId());
//        // then
//        assertThatThrownBy(() -> rowFacade.getRowById(rowCreated2.getId()))
//                .isInstanceOf(EntityNotFoundException.class)
//                .hasMessage("Row with id: " + rowCreated2.getId() + "does not exist!");
//    }

    @Test
    void shouldNotDeleteLastRowWhenBoardHasMoreThanOne() {
        // when
        var rowToCreate1 = new RowCreateDTO(
                String.valueOf(boardCreated.getId()),
                "rowTest1");
        var rowToCreate2 = new RowCreateDTO(
                String.valueOf(boardCreated.getId()),
                "rowTest2");
        // given
        var rowCreated1 = rowFacade.createRow(rowToCreate1);
        var rowCreated2 = rowFacade.createRow(rowToCreate2);
        boardCreated.setRows(List.of(rowCreated1, rowCreated2));
        // then
        assertThatThrownBy(() -> rowFacade.deleteRow(rowCreated2.getId()))
                .isInstanceOf(RowCantBeDeletedException.class)
                .hasMessage("Last row can not be deleted.");
    }

    @Test
    void shouldNotDeleteRowWhenBoardHasOnlyOne() {
        // when
        var rowToCreate = new RowCreateDTO(
                String.valueOf(boardCreated.getId()),
                "rowTest");
        // given
        var rowCreated = rowFacade.createRow(rowToCreate);
        // then
        assertThatThrownBy(() -> rowFacade.deleteRow(rowCreated.getId()))
                .isInstanceOf(BoardHasTooFewRowsToDeleteException.class)
                .hasMessage("Board must have at least one row.");
    }

    @AfterEach
    void deleteUserAndBoard() {
        boardFacade.deleteBoard(boardCreated.getId());
        userFacade.deleteUser(userCreated.getId());
    }

}