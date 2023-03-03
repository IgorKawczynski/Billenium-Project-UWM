package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.basic.UpdateDTO;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnCreateDTO;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColumnCRUDService {

    private final ColumnCreatorLogic creator;
    private final ColumnReader reader;
    private final ColumnUpdater updater;
    private final ColumnDeleter deleter;

    public Column createColumn(ColumnCreateDTO columnCreateDTO) {
        return creator.createColumnInPenultimatePosition(columnCreateDTO);
    }

    public Column getColumnById(Long id) {
        return reader.getColumnById(id);
    }

    public List<ColumnResponseDTO> getColumnsByBoardId(Long boardId) {
        return reader.getAllColumnsByBoardId(boardId);
    }

    public void updateColumn(UpdateDTO updateDTO) {
        updater.updateColumn(updateDTO);
    }

    public void deleteColumn(Long id) {
        var columnToDelete = reader.getColumnById(id);
        deleter.deleteColumn(columnToDelete);
    }
}
