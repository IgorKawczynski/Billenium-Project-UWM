package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.*;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserBoardAssignmentDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class BoardFacade {

    private final BoardCRUDService boardCRUDService;
    private final UserCRUDService userCRUDService;
    private final CardCRUDService cardCRUDService;

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

    public BoardUpdateDTO updateBoardTitle(Long boardId, String newTitle) {
        var board = boardCRUDService.updateBoardTitle(boardId, newTitle);
        return new BoardUpdateDTO(
                board.getId().toString(),
                board.getTitle().toString(),
                board.getWipLimit().toString()
        );
    }

    public BoardUpdateDTO updateBoardWipLimit (Long boardId, String newWipLimit) {
        var wipLimit = Integer.parseInt(newWipLimit);
        var board = boardCRUDService.updateBoardWipLimit(boardId, wipLimit);
        return new BoardUpdateDTO(
                board.getId().toString(),
                board.getTitle().toString(),
                board.getWipLimit().toString()
        );
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
        var userIdToDeleteFromBoard = Long.parseLong(boardUserDeleteDTO.userId());

        var board = boardCRUDService.getBoardById(boardId);
        var userToDeleteFromBoard = userCRUDService.getUserById(userIdToDeleteFromBoard);

        deleteUserFromAssignedCards(board, userToDeleteFromBoard);

        return boardCRUDService
                .deleteAssignedUserFromBoard(boardId, userToDeleteFromBoard)
                .stream()
                .map(User::toDto)
                .sorted(Comparator.comparing(UserResponseDTO::firstName)
                        .thenComparing(UserResponseDTO::lastName))
                .collect(Collectors.toList());
    }

    public void passAndLeaveBoard(BoardPassDTO boardPassDTO) {
        var boardId = Long.parseLong(boardPassDTO.boardId());
        var userIdToDeleteFromBoard = Long.parseLong(boardPassDTO.creatorId());
        var userIdToPassBoard = Long.parseLong(boardPassDTO.userIdToPassBoard());

        var board = boardCRUDService.getBoardById(boardId);
        var userToDeleteFromBoard = userCRUDService.getUserById(userIdToDeleteFromBoard);
        var userToPassBoard = userCRUDService.getUserById(userIdToPassBoard);

        deleteUserFromAssignedCards(board, userToDeleteFromBoard);
        boardCRUDService.passAndLeaveBoard(board, userToDeleteFromBoard, userToPassBoard);
    }

    private void deleteUserFromAssignedCards(Board board, User userToDeleteFromBoard) {
        var columns = board.getColumns();
        var cells = new ArrayList<Cell>();

        for(Column column: columns) {
            cells.addAll(column.getCells());
        }

        for(Cell cell: cells){
            for(Card card: cell.getCards()){
                cardCRUDService.deleteAssignedUserFromCard(card.getId(), userToDeleteFromBoard) ;
            }
        }
    }

}
