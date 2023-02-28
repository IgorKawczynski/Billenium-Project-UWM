package pl.uwm.projektzespolowy.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.board.dtos.BoardCreateDTO;
import pl.uwm.projektzespolowy.board.dtos.BoardResponseDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardCRUDService boardCRUDService;

    @GetMapping("/{boardId}")
    public BoardResponseDTO getBoardById(@PathVariable Long boardId) {
        return boardCRUDService.getBoardById(boardId).toDto();
    }

    @PostMapping("")
    public BoardResponseDTO createBoard(@RequestBody BoardCreateDTO boardCreateDTO) {
        return boardCRUDService.createBoard(boardCreateDTO).toDto();
    }

    @GetMapping("/test/")
    public String getTest() {
        return "TEST TEST TEST";
    }

}
