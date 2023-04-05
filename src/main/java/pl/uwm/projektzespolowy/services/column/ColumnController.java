package pl.uwm.projektzespolowy.services.column;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.column.ColumnCreateDTO;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.column.ColumnUpdateDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/columns")
public class ColumnController {

    private final ColumnFacade columnFacade;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public ColumnResponseDTO createColumn(@RequestBody ColumnCreateDTO columnCreateDTO) {
        return columnFacade.createColumn(columnCreateDTO).toDto();
    }

    @GetMapping("/{columnId}")
    @ResponseStatus(HttpStatus.OK)
    public ColumnResponseDTO getColumnById(@PathVariable Long columnId) {
        return columnFacade.getColumnById(columnId);
    }

    @GetMapping("/{boardId}/all")
    @ResponseStatus(HttpStatus.OK)
    public List<ColumnResponseDTO> getAllColumnsByBoardId(@PathVariable Long boardId) {
        return columnFacade.getAllColumnsByBoardId(boardId);
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public ColumnResponseDTO updateColumn(@RequestBody ColumnUpdateDTO columnUpdateDTO) {
        return columnFacade.updateColumn(columnUpdateDTO);
    }

    @PutMapping("/move")
    @ResponseStatus(HttpStatus.OK)
    public ColumnResponseDTO moveColumn(@RequestBody MoveDTO columnMoveDTO) {
        return columnFacade.moveColumn(columnMoveDTO);
    }

    @DeleteMapping("/{columnId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteColumnById(@PathVariable Long columnId) {
        columnFacade.deleteColumn(columnId);
    }

}
