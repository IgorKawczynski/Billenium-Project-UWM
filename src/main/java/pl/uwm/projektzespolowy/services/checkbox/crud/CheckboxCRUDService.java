package pl.uwm.projektzespolowy.services.checkbox.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CheckboxCRUDService {

    private final CheckboxCreator checkboxCreator;
    private final CheckboxReader checkboxReader;
    private final CheckboxUpdater checkboxUpdater;
    private final CheckboxDeleter checkboxDeleter;

    public Checkbox getCheckboxById(Long checkboxId) {
        return checkboxReader.getCheckboxById(checkboxId);
    }

    public List<Checkbox> getAllCheckboxesByCardId(Long cardId) {
        return checkboxReader.getAllCheckboxesByCardId(cardId);
    }

    public Checkbox createCheckbox(Card card, String title) {
        return checkboxCreator.createCheckbox(card, title);
    }

    public Checkbox updateCheckbox(Long checkboxId, String newTitle) {
        var checkboxToChange = checkboxReader.getCheckboxById(checkboxId);
        return checkboxUpdater.editCheckbox(checkboxToChange, newTitle);
    }

    public Checkbox markAsChecked(Long checkboxId) {
        var checkboxToChange = checkboxReader.getCheckboxById(checkboxId);
        return checkboxUpdater.markAsChecked(checkboxToChange);
    }

    public Checkbox markAsUnchecked(Long checkboxId) {
        var checkboxToChange = checkboxReader.getCheckboxById(checkboxId);
        return checkboxUpdater.markAsUnchecked(checkboxToChange);
    }

    public void deleteCheckbox(Long checkboxId) {
        checkboxDeleter.deleteCheckboxById(checkboxId);
    }

}
