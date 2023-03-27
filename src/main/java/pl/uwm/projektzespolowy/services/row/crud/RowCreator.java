package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class RowCreator {

    public final RowRepository rowRepository;

    public Row createRow(Board board, String givenTitle) {
        var position = board.getPositionForNewRow();
        var boardRows = new PositionableList<>(board.getRows());
        var row = new Row(new Title(givenTitle), position, board);
        boardRows.getLastElement().getPosition().moveRight();
        var boardColumns = new PositionableList<>(board.getColumns());
        for (Column column : boardColumns) {
            var newCellPosition = column.getPositionForNewCell();
            column.getCells().add(new Cell(column, newCellPosition));
            var lastColumnCell = new PositionableList<>(column.getCells()).getLastElement();
            lastColumnCell.getPosition().moveRight();
        }

        return rowRepository.saveAndFlush(row);
    }
}
