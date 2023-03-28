package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.row.Row;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RowCRUDService {

    private final RowCreator rowCreator;
    private final RowReader rowReader;
    private final RowUpdater rowUpdater;
    private final RowDeleter rowDeleter;

    public Row createRow(Board board, String title) {
        return rowCreator.createRow(board, title);
    }

    public Row getRowById(Long rowId) {
        return rowReader.getRowById(rowId);
    }

    public List<Row> getAllRowsByBoardId(Long boardId) {
        return rowReader.getAllRowsByBoardId(boardId);
    }

    public Row updateRow(Long rowId, String newTitle) {
        var rowToChange = rowReader.getRowById(rowId);
        return rowUpdater.editRow(rowToChange, newTitle);
    }

    public void deleteRow(Long rowId) {
        var rowToDelete = rowReader.getRowById(rowId);
        var board = rowToDelete.getBoard();
        rowDeleter.deleteRow(board, rowToDelete);
    }

}
