package pl.uwm.projektzespolowy.services.board.crud;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;
import pl.uwm.projektzespolowy.models.board.BoardUpdateDTO;

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

    public String getBoardTitleById(String boardId) {
        var id = Long.parseLong(boardId);
        return reader.getBoardById(id).getTitle().toString();
    }

    public BoardResponseDTO updateBoard(BoardUpdateDTO boardUpdateDTO) {
        var boardId = Long.parseLong(boardUpdateDTO.boardId());
        var boardToChange = reader.getBoardById(boardId);
        return updater.editBoard(boardToChange, boardUpdateDTO.newTitle()).toDto();
    }

    public void deleteBoard(Long id) {
        deleter.deleteBoardById(id);
    }

}
