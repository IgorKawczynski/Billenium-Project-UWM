package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.basic.UpdateDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.validation.ValidatorService;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.column.ColumnRepository;

@Component
@RequiredArgsConstructor
public class ColumnUpdater {

    private final ColumnRepository columnRepository;

    private final ColumnReader columnReader;
    private final ValidatorService validatorService;

    public void updateColumnField(Column column, String fieldName, Object value) {
        validatorService.isNull(fieldName, value);
        switch (fieldName) {
            case "title" -> {
                String title = (String) value;
                column.setTitle(new Title(title));
            }
            case "cardsLimit" -> {
                Integer cardsLimit = (Integer) value;
                column.setCardsLimit(cardsLimit);
            }
        }
        columnRepository.saveAndFlush(column);
    }

    // TODO: Error handling
    public void updateColumn(UpdateDTO updateDTO) {
        var column = columnReader.getColumnById(updateDTO.id());
        updateColumnField(column, updateDTO.fieldName(), updateDTO.value());
    }

}
