package pl.uwm.projektzespolowy.services.row;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.row.RowCreateDTO;
import pl.uwm.projektzespolowy.models.row.RowResponseDTO;
import pl.uwm.projektzespolowy.models.row.RowUpdateDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rows")
public class RowController {


    private final RowFacade rowFacade;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public RowResponseDTO createRow(@RequestBody RowCreateDTO rowCreateDTO) {
        return rowFacade.createRow(rowCreateDTO);
    }

    @GetMapping("/{rowId}")
    @ResponseStatus(HttpStatus.OK)
    public RowResponseDTO getRowById(@PathVariable Long rowId) {
        return rowFacade.getRowById(rowId);
    }

    @GetMapping("/{boardId}/all")
    @ResponseStatus(HttpStatus.OK)
    public List<RowResponseDTO> getAllRowsByBoardId(@PathVariable Long boardId) {
        return rowFacade.getAllRowsByBoardId(boardId);
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public RowResponseDTO updateRow(@RequestBody RowUpdateDTO rowUpdateDTO) {
        return rowFacade.updateRow(rowUpdateDTO);
    }

    @DeleteMapping("/{rowId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRowById(@PathVariable Long rowId) {
        rowFacade.deleteRow(rowId);
    }


}
