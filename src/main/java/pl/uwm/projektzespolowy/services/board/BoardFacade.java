package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.*;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserBoardAssignmentDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class BoardFacade {

    private final BoardCRUDService boardCRUDService;
    private final UserCRUDService userCRUDService;

    public Board createBoard(BoardCreateDTO boardCreateDTO) {
        var creatorId = Long.parseLong(boardCreateDTO.userId());
        var creator = userCRUDService.getUserById(creatorId);
        return boardCRUDService.createBoard(creator, boardCreateDTO.title());
    }

    public Board getBoardById(Long boardId) {
        return boardCRUDService.getBoardById(boardId);
    }

    public String getBoardTitleById(String boardId) {
        var id = Long.parseLong(boardId);
        return boardCRUDService.getBoardTitleById(id).toString();
    }

    public List<UserBoardAssignmentDTO> getAllAssignedUsersToBoard(Long boardId) {
        var board = boardCRUDService.getBoardById(boardId);
        return boardCRUDService
                .getAllAssignedUsersToBoard(boardId)
                .stream()
                .map((User user) -> user.toBoardDto(board))
                .sorted(Comparator.comparing(UserBoardAssignmentDTO::firstName)
                        .thenComparing(UserBoardAssignmentDTO::lastName))
                .collect(Collectors.toList());
    }

    public BoardResponseDTO updateBoard(BoardUpdateDTO boardUpdateDTO) {
        var boardId = Long.parseLong(boardUpdateDTO.boardId());
        var newTitle = boardUpdateDTO.newTitle();
        return boardCRUDService.updateBoard(boardId, newTitle).toDto();
    }

    public List<UserResponseDTO> assignUserToBoard(BoardUserCreateDTO boardUserCreateDTO) {
        var userToAssign = userCRUDService.getUserByEmail(boardUserCreateDTO.userEmail());
        var boardId = Long.parseLong(boardUserCreateDTO.boardId());
        return boardCRUDService
                .assignUserToBoard(boardId, userToAssign)
                .stream()
                .map(User::toDto)
                .sorted(Comparator.comparing(UserResponseDTO::firstName)
                        .thenComparing(UserResponseDTO::lastName))
                .collect(Collectors.toList());
    }

    public void deleteBoard(Long boardId) {
        boardCRUDService.deleteBoard(boardId);
    }

    public List<UserResponseDTO> deleteAssignedUserFromBoard(BoardUserDeleteDTO boardUserDeleteDTO) {
        var boardId = Long.parseLong(boardUserDeleteDTO.boardId());
        var userToDeleteFromBoard = userCRUDService.getUserById(Long.parseLong(boardUserDeleteDTO.userId()));
        return boardCRUDService
                .deleteAssignedUserFromBoard(boardId, userToDeleteFromBoard)
                .stream()
                .map(User::toDto)
                .sorted(Comparator.comparing(UserResponseDTO::firstName)
                        .thenComparing(UserResponseDTO::lastName))
                .collect(Collectors.toList());
    }

}
