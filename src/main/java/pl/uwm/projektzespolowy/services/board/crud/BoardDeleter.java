package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.BoardCantBeDeletedException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;

import java.util.Set;

@Component
@RequiredArgsConstructor
class BoardDeleter {

    private final BoardRepository boardRepository;

    public void deleteBoardById(Board board) {
        if (!isBoardDeletingAllowed(board)) {
            throw new BoardCantBeDeletedException("Board with assigned users cannot be deleted");
        }

        boardRepository.deleteById(board.getId());
    }

    public Set<User> deleteAssignedUserFromBoard(Board board, User userToDeleteFromBoard) {
        board.removeUser(userToDeleteFromBoard);
        return boardRepository.saveAndFlush(board).getAssignedUsers();
    }

    private boolean isBoardDeletingAllowed(Board board) {
        return board.getAssignedUsers().size() == 1;
    }

}
