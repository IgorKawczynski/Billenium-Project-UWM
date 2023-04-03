package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.services.user.UserFacade;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class BoardFacadeTest {

    private final BoardFacade boardFacade;
    private final UserFacade userFacade;
    private User user;
    private Board board;

    @BeforeAll
    void createUser() {
        this.user = userFacade.createUser(new UserCreateDTO("test@email.pl", "passwordtest", "firstName", "lastName"));
    }

    @AfterAll
    void deleteUser() {
        userFacade.deleteUser(this.user.getId());
    }

    @Test
    @Order(1)
    void shouldCreateBoard() {
        // given
        this.board = boardFacade.createBoard(new BoardCreateDTO(this.user.getId().toString(), "test title"));
        // when
        assertThatNoException().isThrownBy(() -> boardFacade.getBoardById(this.board.getId()));
    }

    @Test
    @Order(2)
    void shouldContainBoardCreatorInAssignedUsersSetWhenCreated() {
        // when
        var assignedUsers = board.getAssignedUsers();
        // then
        assertThat(assignedUsers).containsOnly(board.getCreator());
    }

    @Test
    @Order(3)
    void shouldContainThreeColumnsWhenCreated() {
        // when
        var boardColumns = board.getColumns();
        // then
        assertThat(boardColumns).hasSize(3);
    }

    @Test
    @Order(4)
    void shouldContainSixColorsWhenCreated() {
        // when
        var boardColors = board.getColors();
        // then
        assertThat(boardColors).hasSize(6);
    }

    @Test
    @Order(5)
    void shouldContainOneRowWhenCreated() {
        // when
        var boardRows = board.getRows();
        // then
        assertThat(boardRows).hasSize(1);
    }

    @Test
    @Order(6)
    void shouldReturnNewPositionForColumn() {
        // when
        var positionForNewColumn = board.getPositionForNewColumn();
        // then
        assertThat(positionForNewColumn).isInstanceOf(Position.class);
        assertThat(positionForNewColumn.value()).isEqualTo(2);
    }

    @Test
    @Order(99999)
    void shouldDeleteBoard() {
        // when
        boardFacade.deleteBoard(this.board.getId());
        // then
        assertThatThrownBy(() -> boardFacade.getBoardById(board.getId()))
                .isInstanceOf(EntityNotFoundException.class)
                .hasMessage("Board with id: " + board.getId() + " does not exist!");
    }

}
