package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;

import java.util.Set;

@Component
@RequiredArgsConstructor
class BoardDeleter {

    private final BoardRepository boardRepository;

    public void deleteBoardById(Board board) {
        boardRepository.deleteById(board.getId());
    }

    public Set<User> deleteAssignedUserFromBoard(Board board, User userToDeleteFromBoard) {
        board.removeUser(userToDeleteFromBoard);
        return boardRepository.saveAndFlush(board).getAssignedUsers();
    }

}
