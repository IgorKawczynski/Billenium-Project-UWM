package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.column.Column;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColumnCRUDService {

    private final ColumnCreator columnCreator;
    private final ColumnReader columnReader;
    private final ColumnUpdater columnUpdater;
    private final ColumnDeleter columnDeleter;

    public Column createColumn(Board board, String title) {
        return columnCreator.createColumn(board, title);
    }

    public Column getColumnById(Long columnId) {
        return columnReader.getColumnById(columnId);
    }

    public List<Column> getAllColumnsByBoardId(Long boardId) {
        return columnReader.getAllColumnsByBoardId(boardId);
    }

    public Column updateColumn(Long columnId, String newTitle, Integer cardsLimit, boolean isUnlimited) {
        var columnToChange = columnReader.getColumnById(columnId);
        return columnUpdater.editColumn(columnToChange, newTitle, cardsLimit, isUnlimited);
    }

    public void deleteColumn(Long columnId) {
        var columnToDelete = columnReader.getColumnById(columnId);
        var columnBoard = columnToDelete.getBoard();
        columnDeleter.deleteColumn(columnToDelete, columnBoard);
    }

    public void saveChangedColumn(Column column) {
        columnUpdater.saveChangedColumn(column);
    }

    public void saveChangedColumns(List<Column> columns) {
        columnUpdater.saveChangedColumns(columns);
    }

}
