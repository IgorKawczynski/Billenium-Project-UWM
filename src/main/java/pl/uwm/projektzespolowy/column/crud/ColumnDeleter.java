package pl.uwm.projektzespolowy.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.column.ColumnRepository;

@Component
@RequiredArgsConstructor
public class ColumnDeleter {

    private final ColumnRepository columnRepository;

    public void deleteColumnById(Long id) {
        columnRepository.deleteById(id);
    }

}
