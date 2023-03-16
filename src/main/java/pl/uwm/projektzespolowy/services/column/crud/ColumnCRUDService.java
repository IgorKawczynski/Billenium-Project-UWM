package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnCreateDTO;
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

    public ColumnResponseDTO addColumnToBoard(ColumnCreateDTO columnCreateDTO) {
        var boardId = Long.parseLong(columnCreateDTO.boardId());
        return columnCreator
                .createColumn(boardId, columnCreateDTO.title())
                .toDto();
    }

    public Column getColumnById(Long id) {
        return columnReader.getColumnById(id);
    }

    public ColumnResponseDTO getColumnResponseDTOById(Long id) {
        return columnReader.getColumnById(id).toDto();
    }

    public List<ColumnResponseDTO> getColumnsByBoardId(Long boardId) {
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

    public void saveChangedColumn(Column column) {
        columnUpdater.saveChangedColumn(column);
    }

    public void saveChangedColumns(List<Column> columns) {
        columnUpdater.saveChangedColumns(columns);
    }

    public void deleteColumn(Long id) {
        var columnToDelete = columnReader.getColumnById(id);
        columnDeleter.deleteColumn(columnToDelete);
    }

}
