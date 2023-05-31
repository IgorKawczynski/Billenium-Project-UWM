package pl.uwm.projektzespolowy.services.checkbox.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Component
@RequiredArgsConstructor
class CheckboxUpdater {

    private final CheckboxRepository checkboxRepository;

    public Checkbox editCheckbox(Checkbox checkboxToChange, String givenTitle) {
        if (givenTitle != null) {
            checkboxToChange.setTitle(new Title(givenTitle));
        }
        return checkboxRepository.saveAndFlush(checkboxToChange);
    }

    public Checkbox markAsChecked(Checkbox checkboxToChange) {
        checkboxToChange.setChecked(true);
        return checkboxRepository.saveAndFlush(checkboxToChange);
    }

    public Checkbox markAsUnchecked(Checkbox checkboxToChange) {
        checkboxToChange.setChecked(false);
        return checkboxRepository.saveAndFlush(checkboxToChange);
    }

}
