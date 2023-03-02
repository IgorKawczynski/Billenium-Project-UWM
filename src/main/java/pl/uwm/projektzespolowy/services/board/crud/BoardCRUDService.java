package pl.uwm.projektzespolowy.services.board.crud;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.basic.UpdateDTO;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;

@Component
@RequiredArgsConstructor
public class BoardCRUDService {

    private final BoardReader reader;
    private final BoardCreator creator;
    private final BoardUpdater updater;
    private final BoardDeleter deleter;

    public Board createBoard(BoardCreateDTO boardCreateDTO) {
        return creator.createBoard(boardCreateDTO.title(), boardCreateDTO.userId());
    }

    public Board getBoardById(Long id) {
        return reader.getBoardById(id);
    }

    public void updateBoard(UpdateDTO updateDTO) {
        updater.updateBoard(updateDTO);
    }

    public void deleteBoard(Long id) {
        deleter.deleteBoardById(id);
    }

}
