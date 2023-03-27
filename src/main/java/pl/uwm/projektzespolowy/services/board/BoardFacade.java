package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;
import pl.uwm.projektzespolowy.models.board.BoardUpdateDTO;
import pl.uwm.projektzespolowy.models.board.BoardUserUpdateDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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

    public Set<UserResponseDTO> getAllAssignedUsersToBoard(Long boardId) {
        return boardCRUDService
                .getAllAssignedUsersToBoard(boardId)
                .stream()
                .map(User::toDto)
                .collect(Collectors.toSet());
    }

    public BoardResponseDTO updateBoard(BoardUpdateDTO boardUpdateDTO) {
        return boardCRUDService.updateBoard(boardUpdateDTO);
    }

    public List<UserResponseDTO> assignUserToBoard(BoardUserUpdateDTO boardUserUpdateDTO) {
        var userToAssign = userCRUDService.getUserByEmail(boardUserUpdateDTO.userEmail());
        var board = boardCRUDService.getBoardById(Long.parseLong(boardUserUpdateDTO.boardId()));
        return boardCRUDService.assignUserToBoard(board, userToAssign);
    }

    public void deleteBoard(Long boardId) {
        boardCRUDService.deleteBoard(boardId);
    }

    public List<UserResponseDTO> deleteAssignedUserFromBoard(BoardUserUpdateDTO boardUserUpdateDTO) {
        return boardCRUDService.deleteAssignedUserFromBoard(boardUserUpdateDTO);
    }

}
