package pl.uwm.projektzespolowy.services.cell;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    @ResponseStatus(HttpStatus.OK)
    public List<CellResponseDTO> getAllCellsByColumnId(@PathVariable Long columnId) {
        return cellFacade.getAllCellsByColumnId(columnId);
    }

}
