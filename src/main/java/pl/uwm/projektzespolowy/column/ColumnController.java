package pl.uwm.projektzespolowy.column;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.basic.UpdateDTO;
import pl.uwm.projektzespolowy.column.dtos.ColumnCreateDTO;
import pl.uwm.projektzespolowy.column.dtos.ColumnDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/columns")
public class ColumnController {

    private final ColumnCRUDService service;

    @PostMapping("")
    public ColumnDTO createColumn(@RequestBody ColumnCreateDTO columnCreateDTO) {
        return service.createColumn(columnCreateDTO).toDto();
    }

    @GetMapping("/{columnId}")
    public ColumnDTO getColumnById(@PathVariable Long columnId) {
        return service.getColumnById(columnId).toDto();
    }

    @PatchMapping("")
    public void updateColumn(@RequestBody UpdateDTO updateDTO) {
        service.updateColumn(updateDTO);
    }

    @DeleteMapping("/{columnId}")
    public void deleteColumnById(@PathVariable Long columnId) {
        service.deleteColumn(columnId);
    }

}
