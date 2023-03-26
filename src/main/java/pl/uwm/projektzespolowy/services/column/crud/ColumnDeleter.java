package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.BoardHasTooFewColumnsToDeleteException;
import pl.uwm.projektzespolowy.exceptions.ColumnCantBeDeletedException;
import pl.uwm.projektzespolowy.exceptions.VOExceptions.ColumnDoesNotExistsException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class ColumnDeleter {

    private final ColumnRepository columnRepository;

    public void deleteColumn(Column columnToDelete, Board board) {
        validateIfColumnCanBeDeleted(board, columnToDelete);
        var boardColumns = new PositionableList<>(board.getColumns());
        var previousColumn = boardColumns.getPreviousElement(columnToDelete);
        cutCardsFromColumnToDeleteToPreviousColumn(previousColumn, columnToDelete);
        boardColumns.withHigherOrEqualPositionThanGiven(columnToDelete);
        boardColumns.moveLeftAll();
        board.deleteColumn(columnToDelete);
        columnRepository.delete(columnToDelete);
        columnRepository.saveAll(boardColumns.list());
    }

    public void validateIfColumnCanBeDeleted(Board board, Column columnToDelete) {
        if (board.getColumns().size() <= 2) {
            throw new BoardHasTooFewColumnsToDeleteException("Board must have at least two columns.");
        }
        if (columnToDeleteIsFirstBoardColumn(board, columnToDelete)) {
            throw new ColumnCantBeDeletedException("First column can not be deleted.");
        }
        if (columnToDeleteIsLastBoardColumn(board, columnToDelete)) {
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

    private boolean columnToDeleteIsLastBoardColumn(Board board, Column columnToDelete) {
        var lastColumn = board.getColumns()
                .stream()
                .filter(column -> column.getPosition().value() == board.getColumns().size() - 1)
                .findFirst()
                .orElseThrow(() -> new ColumnDoesNotExistsException("Board doesn't have column with first position."));
        return lastColumn.getPosition().compareTo(columnToDelete.getPosition()) == 0;
    }

    private boolean columnToDeleteIsFirstBoardColumn(Board board, Column columnToDelete) {
        var firstColumn = board.getColumns()
                .stream()
                .filter(column -> column.getPosition().value() == 0)
                .findFirst()
                .orElseThrow(() -> new ColumnDoesNotExistsException("Board doesn't have column with last position."));
        return firstColumn.getPosition().compareTo(columnToDelete.getPosition()) == 0;
    }

    private void moveCardsFromOneCellToAnother(Cell firstCell, Cell secondCell) {
        firstCell.addAll(secondCell.getCards());
    }

}
