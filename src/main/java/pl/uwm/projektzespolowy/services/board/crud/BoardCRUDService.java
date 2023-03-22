package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;
import pl.uwm.projektzespolowy.models.board.BoardUpdateDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Component
@RequiredArgsConstructor
public class BoardCRUDService {

    private final BoardReader boardReader;
    private final BoardCreator boardCreator;
    private final BoardUpdater boardUpdater;
    private final BoardDeleter boardDeleter;

    public BoardResponseDTO createBoard(User creator, String title) {
        return boardCreator.createBoard(creator, title).toDto();
    }

    public Board getBoardById(Long boardId) {
        return boardReader.getBoardById(boardId);
    }

    public Title getBoardTitleById(Long boardId) {
        return boardReader.getBoardById(boardId).getTitle();
    }

    public BoardResponseDTO updateBoard(BoardUpdateDTO boardUpdateDTO) {
        var boardId = Long.parseLong(boardUpdateDTO.boardId());
        var boardToChange = boardReader.getBoardById(boardId);
        return boardUpdater.editBoard(boardToChange, boardUpdateDTO.newTitle()).toDto();
    }

    public void deleteBoard(Long boardId) {
        boardDeleter.deleteBoardById(boardId);
    }

}
