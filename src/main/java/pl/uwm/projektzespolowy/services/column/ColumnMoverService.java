package pl.uwm.projektzespolowy.services.column;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.services.PositionableList;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
class ColumnMoverService {

    public ArrayList<Column> moveColumn(Column column, Integer newPosition) {
        var columnsToChange = new PositionableList<>(column.getBoard().getColumns());
        columnsToChange.moveInRange(column.getPosition(), new Position(newPosition));

        column.getPosition().moveTo(newPosition);
        return new ArrayList<>(columnsToChange.list());
    }

}
