package pl.uwm.projektzespolowy.column;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ColumnDeleter {

    private final ColumnRepository columnRepository;

    public void deleteColumnById(Long id) {
        columnRepository.deleteById(id);
    }

}
