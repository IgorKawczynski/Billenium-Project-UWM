package pl.uwm.projektzespolowy.services.cell;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.cell.CellResponseDTO;
import pl.uwm.projektzespolowy.services.cell.crud.CellCRUDService;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CellFacade {

    private final CellCRUDService cellCRUDService;

    public CellResponseDTO getCellById(Long cellId) {
        return cellCRUDService.getCellById(cellId).toDto();
    }

    public List<CellResponseDTO> getAllCellsByColumnId(Long columnId) {
        return cellCRUDService
                .getAllCellsByColumnId(columnId)
                .stream().map(Cell::toDto)
                .sorted(Comparator.comparingInt(CellResponseDTO::position))
                .toList();
    }

}
