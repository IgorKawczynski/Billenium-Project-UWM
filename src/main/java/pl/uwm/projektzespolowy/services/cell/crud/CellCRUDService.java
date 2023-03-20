package pl.uwm.projektzespolowy.services.cell.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.cell.Cell;

@Service
@RequiredArgsConstructor
public class CellCRUDService {

    private final CellCreator cellCreator;
    private final CellReader cellReader;
    private final CellUpdater cellUpdater;
    private final CellDeleter cellDeleter;


    public Cell getCellById(Long id) {
        return cellReader.getCellById(id);
    }


}
