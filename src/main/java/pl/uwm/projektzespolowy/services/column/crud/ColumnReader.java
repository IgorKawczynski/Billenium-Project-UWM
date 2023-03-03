package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.services.column.ColumnRepository;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ColumnReader {

    private final ColumnRepository columnRepository;

    public Column getColumnById(Long id) {
        return columnRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("column", "Column with id: " + id + " does not exist!"));
    }

    public List<ColumnResponseDTO> getAllColumnsByBoardId(Long boardId) {
        var columns = columnRepository.findAllByBoardId(boardId);
        return columns
                .stream()
                .map(Column::toDto)
                .sorted(Comparator.comparingInt(ColumnResponseDTO::position))
                .toList();
    }

}
