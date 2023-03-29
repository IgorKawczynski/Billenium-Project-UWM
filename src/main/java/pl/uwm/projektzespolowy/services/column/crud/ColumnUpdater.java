package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.List;

import static pl.uwm.projektzespolowy.models.column.Column.UNLIMITED_SIZE;

@Component
@RequiredArgsConstructor
class ColumnUpdater {

    private final ColumnRepository columnRepository;

    public Column editColumn(Column columnToChange, String givenTitle, Integer givenCardsLimit, boolean isUnlimited) {
        if (givenTitle != null) {
            columnToChange.setTitle(new Title(givenTitle));
        }
        if (givenCardsLimit != null) {
            columnToChange.setCardsLimit(givenCardsLimit);
        }
        if (isUnlimited) {
            columnToChange.setCardsLimit(UNLIMITED_SIZE);
        }
        return columnRepository.saveAndFlush(columnToChange);
    }

    public void saveChangedColumns(List<Column> columns) {
        columnRepository.saveAll(columns);
    }

    public void saveChangedColumn(Column column) {
        columnRepository.saveAndFlush(column);
    }

}
