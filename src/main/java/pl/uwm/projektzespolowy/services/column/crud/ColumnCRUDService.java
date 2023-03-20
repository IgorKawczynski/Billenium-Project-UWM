package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.column.ColumnUpdateDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColumnCRUDService {

    private final ColumnCreator columnCreator;
    private final ColumnReader columnReader;
    private final ColumnUpdater columnUpdater;
    private final ColumnDeleter columnDeleter;

    public ColumnResponseDTO createColumn(Board board, String title) {
        return columnCreator.createColumn(board, title).toDto();
    }

    public Column getColumnById(Long id) {
        return columnReader.getColumnById(id);
    }

    public List<Column> getAllColumnsByBoardId(Long boardId) {
        return columnReader.getAllColumnsByBoardId(boardId);
    }

    public ColumnResponseDTO updateColumn(ColumnUpdateDTO columnUpdateDTO) {
        var columnId = Long.parseLong(columnUpdateDTO.columnId());
        var columnToChange = columnReader.getColumnById(columnId);
        return columnUpdater
                .editColumn(
                        columnToChange,
                        columnUpdateDTO.title(),
                        columnUpdateDTO.cardsLimit(),
                        columnUpdateDTO.isUnlimited()
                )
                .toDto();
    }

    public void deleteColumn(Board board, Long columnId) {
        var columnToDelete = columnReader.getColumnById(columnId);
        columnDeleter.deleteColumn(board, columnToDelete);
    }

    public void saveChangedColumn(Column column) {
        columnUpdater.saveChangedColumn(column);
    }

    public void saveChangedColumns(List<Column> columns) {
        columnUpdater.saveChangedColumns(columns);
    }

}
