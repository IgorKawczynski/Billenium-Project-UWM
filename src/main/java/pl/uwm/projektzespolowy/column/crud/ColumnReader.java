package pl.uwm.projektzespolowy.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.column.ColumnRepository;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

@Component
@RequiredArgsConstructor
public class ColumnReader {

    private final ColumnRepository columnRepository;

    public Column getColumnById(Long id) {
        return columnRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Column with id: " + id + " does not exist!"));
    }

}
