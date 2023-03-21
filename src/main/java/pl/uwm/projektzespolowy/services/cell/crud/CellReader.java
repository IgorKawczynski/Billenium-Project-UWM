package pl.uwm.projektzespolowy.services.cell.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.cell.Cell;

import java.util.List;

@Component
@RequiredArgsConstructor
class CellReader {

    private final CellRepository cellRepository;

    public Cell getCellById(Long id) {
        return cellRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("cell", "Cell with id: " + id + " does not exist!"));
    }

    public List<Cell> getAllCellsByColumnId(Long columnId) {
        return cellRepository.findAllByColumnId(columnId);
    }

}
