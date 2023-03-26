package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.BoardHasTooFewColumnsToDeleteException;
import pl.uwm.projektzespolowy.exceptions.ColumnCantBeDeletedException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class ColumnDeleter {

    private final ColumnRepository columnRepository;

    public void deleteColumn(Column columnToDelete, Board board) {
        var boardColumns = new PositionableList<>(board.getColumns());
        validateIfColumnCanBeDeleted(board, boardColumns, columnToDelete);
        var previousColumn = boardColumns.getPreviousElement(columnToDelete);
        cutCardsFromColumnToDeleteToPreviousColumn(previousColumn, columnToDelete);
        boardColumns.withHigherOrEqualPositionThanGiven(columnToDelete);
        boardColumns.moveLeftAll();
        board.deleteColumn(columnToDelete);
        columnRepository.delete(columnToDelete);
        columnRepository.saveAll(boardColumns.list());
    }

    public void validateIfColumnCanBeDeleted(Board board, PositionableList<Column> boardColumns, Column columnToDelete) {
        if (board.getColumns().size() <= 2) {
            throw new BoardHasTooFewColumnsToDeleteException("Board must have at least two columns.");
        }
        if (columnToDeleteIsFirstBoardColumn(boardColumns, columnToDelete)) {
            throw new ColumnCantBeDeletedException("First column can not be deleted.");
        }
        if (columnToDeleteIsLastBoardColumn(boardColumns, columnToDelete)) {
            throw new ColumnCantBeDeletedException("Last column can not be deleted.");
        }
    }

    private void cutCardsFromColumnToDeleteToPreviousColumn(Column previousColumn, Column columnToDelete) {
        var cellsFromPreviousColumn = previousColumn.getCells();
        var cellsFromColumnToDelete = columnToDelete.getCells();
        int counter = 0;
        while(counter < cellsFromPreviousColumn.size()) {
            moveCardsFromOneCellToAnother(cellsFromPreviousColumn.get(counter), cellsFromColumnToDelete.get(counter));
            counter++;
        }
    }

    private boolean columnToDeleteIsLastBoardColumn(PositionableList<Column> boardColumns, Column columnToDelete) {
        var lastColumn = boardColumns.getLastElement();
        return lastColumn.getPosition().compareTo(columnToDelete.getPosition()) == 0;
    }

    private boolean columnToDeleteIsFirstBoardColumn(PositionableList<Column> boardColumns, Column columnToDelete) {
        var firstColumn = boardColumns.getFirstElement();
        return firstColumn.getPosition().compareTo(columnToDelete.getPosition()) == 0;
    }

    private void moveCardsFromOneCellToAnother(Cell firstCell, Cell secondCell) {
        firstCell.addAll(secondCell.getCards());
    }

}
