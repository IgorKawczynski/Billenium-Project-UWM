package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
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
        validateIfRowCanBeDeleted(boardRows, rowToDelete);
        boardRows.withHigherOrEqualPositionThanGiven(rowToDelete);
        boardRows.moveLeftAll();
        var boardColumns = new PositionableList<>(board.getColumns());
        cutCardsFromRowToDeleteToLastRow(boardColumns, rowToDelete);

        for(Column column: boardColumns) {
            var boardCells = new PositionableList<>(column.getCells());
            boardCells.withHigherOrEqualPositionThanGiven(boardCells.get(rowToDelete.getPosition().value()));
            boardCells.moveLeftAll();

            column.getCells()
                    .remove(rowToDelete.getPosition().value());
        }

        board.deleteRow(rowToDelete);
        rowRepository.delete(rowToDelete);
        rowRepository.saveAll(boardRows.list());
    }

    private void validateIfRowCanBeDeleted(PositionableList<Row> boardRows, Row rowToDelete) {
        if (rowToDeleteIsLastBoardRow(boardRows, rowToDelete)) {
            throw new RowCantBeDeletedException("Last board row can not be deleted.");
        }
    }

    private boolean rowToDeleteIsLastBoardRow(PositionableList<Row> boardRows, Row rowToDelete) {
        var lastBoardRow = boardRows.getLastElement();
        return rowToDelete.getPosition().compareTo(lastBoardRow.getPosition()) == 0;
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
