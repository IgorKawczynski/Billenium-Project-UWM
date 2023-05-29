package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.WipLimitTooLowException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.Set;

@Component
@RequiredArgsConstructor
class BoardUpdater {
    private final BoardRepository boardRepository;

    public Board editBoardTitle(Board boardToChange, String givenTitle) {
        if (givenTitle != null) {
            boardToChange.setTitle(new Title(givenTitle));
        }
        return boardRepository.saveAndFlush(boardToChange);
    }

    public Board editBoardWipLimit(Board boardToChange, Integer givenWipLimit) {
        if (givenWipLimit <= 0) {
            throw new WipLimitTooLowException("Wip limit cannot be less than 1.");
        }
        boardToChange.setWipLimit(givenWipLimit);
        return boardRepository.saveAndFlush(boardToChange);
    }

    public Set<User> assignUserToBoard(Board board, User userToAssign) {
        board.assignUser(userToAssign);
        return boardRepository.saveAndFlush(board).getAssignedUsers();
    }

    public void passAndLeaveBoard(Board board, User userToDeleteFromBoard, User userToPassBoard) {
        board.setCreator(userToPassBoard);

        board.removeUser(userToDeleteFromBoard);
        boardRepository.saveAndFlush(board);
    }

}
