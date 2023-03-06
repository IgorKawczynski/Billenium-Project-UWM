package pl.uwm.projektzespolowy.services.board.crud;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.basic.UpdateDTO;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;

@Component
@RequiredArgsConstructor
public class BoardCRUDService {

    private final BoardReader reader;
    private final BoardCreator creator;
    private final BoardUpdater updater;
    private final BoardDeleter deleter;

    public BoardResponseDTO createBoard(BoardCreateDTO boardCreateDTO) {
        return creator
                .createBoard(boardCreateDTO.title(), boardCreateDTO.userId())
                .toDto();
    }

    public BoardResponseDTO getBoardById(Long id) {
        return reader
                .getBoardById(id)
                .toDto();
    }

    public void updateBoard(UpdateDTO updateDTO) {
        updater.updateBoard(updateDTO);
    }

    public void deleteBoard(Long id) {
        deleter.deleteBoardById(id);
    }

}
