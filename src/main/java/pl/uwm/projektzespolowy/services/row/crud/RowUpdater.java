package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.List;


@Component
@RequiredArgsConstructor
public class RowUpdater {

    private final RowRepository rowRepository;

    public Row editRow(Row rowToChange, String givenTitle) {
        if (givenTitle != null) {
            rowToChange.setTitle(new Title(givenTitle));
        }
        return rowRepository.saveAndFlush(rowToChange);
    }

    public void saveChangedRows(List<Row> rows) {
        rowRepository.saveAll(rows);
    }

    public void saveChangedRow(Row rows) {
        rowRepository.saveAndFlush(rows);
    }

}
