package pl.uwm.projektzespolowy.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.board.dtos.BoardCreateDTO;
import pl.uwm.projektzespolowy.board.dtos.BoardResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardFacade facade;

    @GetMapping("/{boardId}")
    public Board getBoardById(@PathVariable Long boardId) {
        return facade.getBoardById(boardId);
    }

    @PostMapping("")
    public BoardResponseDTO createBoard(@RequestBody BoardCreateDTO boardCreateDTO) {
        return facade.createBoard(boardCreateDTO).toDto();
    }

}
