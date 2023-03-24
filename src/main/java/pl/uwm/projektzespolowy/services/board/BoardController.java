package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;
import pl.uwm.projektzespolowy.models.board.BoardUpdateDTO;
import pl.uwm.projektzespolowy.models.board.BoardUserUpdateDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardFacade boardFacade;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public BoardResponseDTO createBoard(@RequestBody BoardCreateDTO boardCreateDTO) {
        return boardFacade.createBoard(boardCreateDTO);
    }

    @GetMapping("/{boardId}")
    @ResponseStatus(HttpStatus.OK)
    public BoardResponseDTO getBoardById(@PathVariable Long boardId) {
        return boardFacade.getBoardById(boardId);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"boardId"})
    @ResponseStatus(HttpStatus.OK)
    public String getBoardTitleById(@RequestParam String boardId) {
        return boardFacade.getBoardTitleById(boardId);
    }

    @GetMapping("/users/{boardId}")
    @ResponseStatus(HttpStatus.OK)
    public Set<UserResponseDTO> getAllAssignedUsersToBoard(@PathVariable Long boardId) {
        return boardFacade.getAllAssignedUsersToBoard(boardId);
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public BoardResponseDTO updateBoard(@RequestBody BoardUpdateDTO boardUpdateDTO) {
        return boardFacade.updateBoard(boardUpdateDTO);
    }

    @PutMapping("/users/")
    @ResponseStatus(HttpStatus.OK)
    public BoardResponseDTO assignUserToBoard(@RequestBody BoardUserUpdateDTO boardUserUpdateDTO) {
        return boardFacade.assignUserToBoard(boardUserUpdateDTO);
    }

    @DeleteMapping("/{boardId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBoardById(@PathVariable Long boardId) {
        boardFacade.deleteBoard(boardId);
    }

}
