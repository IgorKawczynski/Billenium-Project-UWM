package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.row.Row;

import java.util.List;

@Component
@RequiredArgsConstructor
class RowReader {

    private final RowRepository rowRepository;

    public Row getRowById(Long id) {
        return rowRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("row", "Row with id: " + id + " does not exist!"));
    }

    public List<Row> getAllRowsByBoardId(Long boardId) {
        return rowRepository.findAllByBoardId(boardId);
    }

}
