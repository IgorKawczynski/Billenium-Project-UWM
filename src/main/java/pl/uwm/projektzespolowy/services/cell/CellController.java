package pl.uwm.projektzespolowy.services.cell;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.cell.CellResponseDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cells")
public class CellController {

    private final CellFacade cellFacade;

    @GetMapping("/{cellId}")
    @ResponseStatus(HttpStatus.OK)
    public CellResponseDTO getCellById(@PathVariable Long cellId) {
        return cellFacade.getCellById(cellId);
    }

    @GetMapping("/{columnId}/all")
    public ResponseEntity<List<CellResponseDTO>> getAllCellsByColumnId(@PathVariable Long columnId) {
        var cells = cellFacade.getAllCellsByColumnId(columnId);
        return cells.size() > 0 ? ResponseEntity.ok(cells) : ResponseEntity.noContent().build();
    }

}
