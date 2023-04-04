package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.List;

@Component
@RequiredArgsConstructor
public class BoardCRUDService {

    private final BoardReader boardReader;
    private final BoardCreator boardCreator;
    private final BoardUpdater boardUpdater;
    private final BoardDeleter boardDeleter;

    public Board createBoard(User creator, String title) {
        return boardCreator.createBoard(creator, title);
    }

    public Board getBoardById(Long boardId) {
        return boardReader.getBoardById(boardId);
    }

    public Title getBoardTitleById(Long boardId) {
        return boardReader.getBoardById(boardId).getTitle();
    }

    public List<UserResponseDTO> getAllAssignedUsersToBoard(Long boardId) {
        return boardReader.getBoardAssignedUsers(boardId);
    }

    public Board updateBoard(Long boardId, String newTitle) {
        var boardToChange = boardReader.getBoardById(boardId);
        return boardUpdater.editBoard(boardToChange, newTitle);
    }

    public List<User> assignUserToBoard(Long boardId, User userToAssign) {
        var board = boardReader.getBoardById(boardId);
        return boardUpdater.assignUserToBoard(board, userToAssign).stream().toList();
    }

    public void deleteBoard(Long boardId) {
        boardDeleter.deleteBoardById(boardId);
    }

    public List<User> deleteAssignedUserFromBoard(Long boardId, User userToDeleteFromBoard) {
        var board = boardReader.getBoardById(boardId);
        return boardDeleter.deleteAssignedUserFromBoard(board, userToDeleteFromBoard).stream().toList();
    }

}
