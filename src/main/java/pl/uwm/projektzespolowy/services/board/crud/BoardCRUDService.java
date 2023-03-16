package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;
import pl.uwm.projektzespolowy.models.board.BoardUpdateDTO;

@Component
@RequiredArgsConstructor
public class BoardCRUDService {

    private final BoardReader boardReader;
    private final BoardCreator boardCreator;
    private final BoardUpdater boardUpdater;
    private final BoardDeleter boardDeleter;

    public BoardResponseDTO createBoard(BoardCreateDTO boardCreateDTO) {
        return boardCreator
                .createBoard(boardCreateDTO.title(), boardCreateDTO.userId())
                .toDto();
    }

    public BoardResponseDTO getBoardById(Long id) {
        return boardReader
                .getBoardById(id)
                .toDto();
    }

    public String getBoardTitleById(String boardId) {
        var id = Long.parseLong(boardId);
        return boardReader.getBoardById(id).getTitle().toString();
    }

    public BoardResponseDTO updateBoard(BoardUpdateDTO boardUpdateDTO) {
        var boardId = Long.parseLong(boardUpdateDTO.boardId());
        var boardToChange = boardReader.getBoardById(boardId);
        return boardUpdater.editBoard(boardToChange, boardUpdateDTO.newTitle()).toDto();
    }

    public void deleteBoard(Long id) {
        boardDeleter.deleteBoardById(id);
    }

}
