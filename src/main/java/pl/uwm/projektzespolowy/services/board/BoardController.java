package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.board.*;
import pl.uwm.projektzespolowy.models.user.UserBoardAssignmentDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardFacade boardFacade;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public BoardResponseDTO createBoard(@RequestBody BoardCreateDTO boardCreateDTO) {
        return boardFacade.createBoard(boardCreateDTO).toDto();
    }

    @GetMapping("/{boardId}")
    @ResponseStatus(HttpStatus.OK)
    public BoardResponseDTO getBoardById(@PathVariable Long boardId) {
        return boardFacade.getBoardById(boardId).toDto();
    }

    @RequestMapping(method = RequestMethod.GET, params = {"boardId"})
    @ResponseStatus(HttpStatus.OK)
    public String getBoardTitleById(@RequestParam String boardId) {
        return boardFacade.getBoardTitleById(boardId);
    }

    @GetMapping("/users/{boardId}")
    @ResponseStatus(HttpStatus.OK)
    public List<UserBoardAssignmentDTO> getAllAssignedUsersToBoard(@PathVariable Long boardId) {
        return boardFacade.getAllAssignedUsersToBoard(boardId);
    }

    @PutMapping("/{boardId}/title")
    @ResponseStatus(HttpStatus.OK)
    public BoardUpdateDTO updateBoardTitle(@PathVariable Long boardId, @RequestParam("newTitle") String newTitle) {
        return boardFacade.updateBoardTitle(boardId, newTitle);
    }

    @PutMapping("/{boardId}/wipLimit")
    @ResponseStatus(HttpStatus.OK)
    public BoardUpdateDTO updateBoardWipLimit(@PathVariable Long boardId, @RequestParam("newWipLimit") String newWipLimit) {
        return boardFacade.updateBoardWipLimit(boardId, newWipLimit);
    }

    @PatchMapping("/assign-user")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponseDTO> assignUserToBoard(@RequestBody BoardUserCreateDTO boardUserCreateDTO) {
        return boardFacade.assignUserToBoard(boardUserCreateDTO);
    }

    @DeleteMapping("/{boardId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoardById(@PathVariable Long boardId) {
        boardFacade.deleteBoard(boardId);
    }

    @PatchMapping("/delete-user")
    @ResponseStatus(HttpStatus.OK)
    public List<UserResponseDTO> deleteAssignedUserFromBoard(@RequestBody BoardUserDeleteDTO boardUserDeleteDTO) {
        return boardFacade.deleteAssignedUserFromBoard(boardUserDeleteDTO);
    }

}
