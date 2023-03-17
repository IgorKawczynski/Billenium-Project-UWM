package pl.uwm.projektzespolowy.services.column;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnMoveDTO;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.services.PositionableList;
import pl.uwm.projektzespolowy.services.column.crud.ColumnCRUDService;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ColumnMoverService {

    private final ColumnCRUDService columnCRUDService;

    private ArrayList<Column> moveColumnLogic(Column column, Integer newPosition) {
        var columnsToChange = new PositionableList<>(column.getBoard().getColumns());
        columnsToChange.moveInRange(column.getPosition(), new Position(newPosition));

        column.getPosition().moveTo(newPosition);
        return new ArrayList<>(columnsToChange.list());
    }

    public ColumnResponseDTO moveColumn(ColumnMoveDTO columnMoveDTO) {
        var column = columnCRUDService.getColumnById(Long.parseLong(columnMoveDTO.columnId()));
        var changedColumns = moveColumnLogic(column, columnMoveDTO.newPosition());
        columnCRUDService.saveChangedColumn(column);
        columnCRUDService.saveChangedColumns(changedColumns);
        return column.toDto();
    }

}
