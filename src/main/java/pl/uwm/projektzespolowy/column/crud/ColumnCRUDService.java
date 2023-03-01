package pl.uwm.projektzespolowy.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.basic.UpdateDTO;
import pl.uwm.projektzespolowy.column.Column;
import pl.uwm.projektzespolowy.column.dtos.ColumnCreateDTO;

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

    public void updateColumn(UpdateDTO updateDTO) {
        updater.updateColumn(updateDTO);
    }

    public void deleteColumn(Long id) {
        deleter.deleteColumnById(id);
    }

}
