package pl.uwm.projektzespolowy.services.row;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.uwm.projektzespolowy.exceptions.BoardHasTooFewRowsToDeleteException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.row.RowCreateDTO;
import pl.uwm.projektzespolowy.models.row.RowUpdateDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.services.board.BoardFacade;
import pl.uwm.projektzespolowy.services.user.UserFacade;

import javax.transaction.Transactional;

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

    @Test
    void shouldNotDeleteRowIfBoardHasOnlyOne() {
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