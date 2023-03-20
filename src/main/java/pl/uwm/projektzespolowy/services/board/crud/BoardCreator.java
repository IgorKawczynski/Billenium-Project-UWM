package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Component
@RequiredArgsConstructor
class BoardCreator {

    private final BoardRepository boardRepository;

    public Board createBoard(User creator, String givenTitle) {
        var title = new Title(givenTitle);
        return boardRepository.saveAndFlush(new Board(title, creator));
    }

}
