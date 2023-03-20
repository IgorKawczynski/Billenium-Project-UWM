package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;
import pl.uwm.projektzespolowy.models.board.BoardUpdateDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

@Component
@RequiredArgsConstructor
public class BoardFacade {

    private final BoardCRUDService boardCRUDService;
    private final UserCRUDService userCRUDService;

    public BoardResponseDTO createBoard(BoardCreateDTO boardCreateDTO) {
        var creator = userCRUDService.getUserById(Long.parseLong(boardCreateDTO.userId()));
        return boardCRUDService.createBoard(creator, boardCreateDTO.title());
    }

    public BoardResponseDTO getBoardById(Long boardId) {
        return boardCRUDService.getBoardById(boardId).toDto();
    }

    public String getBoardTitleById(String boardId) {
        return boardCRUDService.getBoardTitleById(Long.parseLong(boardId)).toString();
    }

    public BoardResponseDTO updateBoard(BoardUpdateDTO boardUpdateDTO) {
        return boardCRUDService.updateBoard(boardUpdateDTO);
    }

    public void deleteBoard(Long boardId) {
        boardCRUDService.deleteBoard(boardId);
    }

}
