package pl.uwm.projektzespolowy.services.checkbox.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;

import java.util.List;

@Component
@RequiredArgsConstructor
class CheckboxReader {

    private final CheckboxRepository checkboxRepository;

    public Checkbox getCheckboxById(Long checkboxId) {
        return checkboxRepository.findById(checkboxId).orElseThrow(
                () -> new EntityNotFoundException("checkbox", "Checkbox with id: " + checkboxId + " does not exist!")
        );
    }

    public List<Checkbox> getAllCheckboxesByCardId(Long cardId) {
        return checkboxRepository.findAllByCardId(cardId);
    }

}
