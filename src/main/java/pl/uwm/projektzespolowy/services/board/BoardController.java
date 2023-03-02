package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.UpdateDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.models.board.BoardCreateDTO;
import pl.uwm.projektzespolowy.models.board.BoardResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardCRUDService service;

    @PostMapping("")
    public BoardResponseDTO createBoard(@RequestBody BoardCreateDTO boardCreateDTO) {
        return service.createBoard(boardCreateDTO).toDto();
    }

    @GetMapping("/{boardId}")
    public BoardResponseDTO getBoardById(@PathVariable Long boardId) {
        return service.getBoardById(boardId).toDto();
    }

    @PatchMapping("")
    public void updateBoard(@RequestBody UpdateDTO updateDTO) {
        service.updateBoard(updateDTO);
    }

    @DeleteMapping("/{boardId}")
    public void deleteBoardById(@PathVariable Long boardId) {
        service.deleteBoard(boardId);
    }

}
