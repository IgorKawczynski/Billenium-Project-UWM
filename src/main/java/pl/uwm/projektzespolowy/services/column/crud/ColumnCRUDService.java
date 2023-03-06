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

    private final ColumnCreator creator;
    private final ColumnReader reader;
    private final ColumnUpdater updater;
    private final ColumnDeleter deleter;

    public ColumnResponseDTO addColumnToBoard(ColumnCreateDTO columnCreateDTO) {
        var boardId = Long.parseLong(columnCreateDTO.boardId());
        return creator
                .createColumn(boardId, columnCreateDTO.title())
                .toDto();
    }

    public Column getColumnById(Long id) {
        return reader.getColumnById(id);
    }

    public ColumnResponseDTO getColumnResponseDTOById(Long id) {
        return reader.getColumnById(id).toDto();
    }

    public List<ColumnResponseDTO> getColumnsByBoardId(Long boardId) {
        return reader.getAllColumnsByBoardId(boardId);
    }

    public ColumnResponseDTO updateColumn(ColumnUpdateDTO columnUpdateDTO) {
        var columnId = Long.parseLong(columnUpdateDTO.columnId());
        var columnToChange = reader.getColumnById(columnId);
        return updater
                .editColumn(
                        columnToChange,
                        columnUpdateDTO.title(),
                        columnUpdateDTO.cardsLimit(),
                        columnUpdateDTO.isUnlimited()
                )
                .toDto();
    }

    public void saveChangedColumn(Column column) {
        updater.saveChangedColumn(column);
    }

    public void saveChangedColumns(List<Column> columns) {
        updater.saveChangedColumns(columns);
    }

    public void deleteColumn(Long id) {
        var columnToDelete = reader.getColumnById(id);
        deleter.deleteColumn(columnToDelete);
    }
}
