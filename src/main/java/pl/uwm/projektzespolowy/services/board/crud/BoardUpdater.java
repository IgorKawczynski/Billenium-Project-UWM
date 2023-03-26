package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Component
@RequiredArgsConstructor
class BoardUpdater {
    private final BoardRepository boardRepository;

    public Board editBoard(Board boardToChange, String givenTitle) {
        if (givenTitle != null) {
            boardToChange.setTitle(new Title(givenTitle));
        }
        return boardRepository.saveAndFlush(boardToChange);
    }

    public Board assignUserToBoard(Board boardToChange, User userToAssign) {
        boardToChange.getAssignedUsers().add(userToAssign);
        return boardRepository.saveAndFlush(boardToChange);
    }

}
