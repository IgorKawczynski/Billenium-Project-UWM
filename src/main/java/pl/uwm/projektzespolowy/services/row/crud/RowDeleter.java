package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.BoardHasTooFewRowsToDeleteException;
import pl.uwm.projektzespolowy.exceptions.RowCantBeDeletedException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class RowDeleter {

    private final RowRepository rowRepository;

    public void deleteRow(Board board, Row rowToDelete) {
        var boardRows = new PositionableList<>(board.getRows());
        validateIfRowCanBeDeleted(board, boardRows, rowToDelete);

        boardRows.withHigherOrEqualPositionThanGiven(rowToDelete);
        boardRows.moveLeftAll();
        var boardColumns = new PositionableList<>(board.getColumns());
        cutCardsFromRowToDeleteToLastRow(boardColumns, rowToDelete);

        var rowToDeletePositionValue = rowToDelete.getPosition().value();
        for(Column column: boardColumns) {
            var columnCells = new PositionableList<>(column.getCells());
            columnCells.withHigherOrEqualPositionThanGiven(columnCells.get(rowToDeletePositionValue));
            columnCells.moveLeftAll();

            column.getCells().remove(rowToDelete.getPosition().value());
        }

        board.deleteRow(rowToDelete);
        rowRepository.delete(rowToDelete);
        rowRepository.saveAll(boardRows.list());
    }

    private void validateIfRowCanBeDeleted(Board board, PositionableList<Row> boardRows, Row rowToDelete) {
        if (board.getRows().size() <= 1) {
            throw new BoardHasTooFewRowsToDeleteException("Board must have at least one row.");
        }
        if (rowToDeleteIsLastBoardRow(boardRows, rowToDelete)) {
            throw new RowCantBeDeletedException("Last row can not be deleted.");
        }
    }

    private boolean rowToDeleteIsLastBoardRow(PositionableList<Row> boardRows, Row rowToDelete) {
        var lastRow = boardRows.getLastElement();
        return rowToDelete.getPosition().compareTo(lastRow.getPosition()) == 0;
    }

    private void cutCardsFromRowToDeleteToLastRow(PositionableList<Column> boardColumns, Row rowToDelete) {
        for (Column column: boardColumns) {
            var columnCells = new PositionableList<>(column.getCells());
            var cellWithPositionSameAsRowToDelete = columnCells.get(rowToDelete.getPosition().value());
            var lastColumnCell = columnCells.getLastElement();
            moveCardsFromOneCellToAnother(lastColumnCell, cellWithPositionSameAsRowToDelete);
        }
    }

    private void moveCardsFromOneCellToAnother(Cell firstCell, Cell secondCell) {
        firstCell.addAll(secondCell.getCards());
    }

}
