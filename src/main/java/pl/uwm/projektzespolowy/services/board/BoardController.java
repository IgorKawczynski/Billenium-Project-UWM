package pl.uwm.projektzespolowy.services.board;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.board.BoardUpdateDTO;
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
        return service.createBoard(boardCreateDTO);
    }

    @GetMapping("/{boardId}")
    public BoardResponseDTO getBoardById(@PathVariable Long boardId) {
        return service.getBoardById(boardId);
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public BoardResponseDTO updateBoard(@RequestBody BoardUpdateDTO boardUpdateDTO) {
        return service.updateBoard(boardUpdateDTO);
    }

    @DeleteMapping("/{boardId}")
    public void deleteBoardById(@PathVariable Long boardId) {
        service.deleteBoard(boardId);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"boardId"})
    public String getBoardTitleById(@RequestParam String boardId) {
        return service.getBoardTitleById(boardId);
    }

}
