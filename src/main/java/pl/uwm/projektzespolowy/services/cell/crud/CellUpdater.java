package pl.uwm.projektzespolowy.services.cell.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CellUpdater {

    private final CellRepository cellRepository;

    public Cell editCell(Cell cellToChange, Integer position) {
        if (position != null) {
            cellToChange.setPosition(new Position(position));
        }
        return cellRepository.saveAndFlush(cellToChange);
    }

    public void saveChangedCells(List<Cell> cells) {
        cellRepository.saveAll(cells);
    }

    public void saveChangedCell(Cell cell) {
        cellRepository.saveAndFlush(cell);
    }
}
