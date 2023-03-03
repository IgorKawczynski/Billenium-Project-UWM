package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.board.BoardRepository;
import pl.uwm.projektzespolowy.services.user.UserRepository;

@Component
@RequiredArgsConstructor
public class BoardCreator {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;

    public Board createBoard(String givenTitle, Long ownerId) {
        var boardOwner = userRepository.getReferenceById(ownerId);
        var title = new Title(givenTitle);
        return boardRepository.saveAndFlush(new Board(title, boardOwner));
    }
}
