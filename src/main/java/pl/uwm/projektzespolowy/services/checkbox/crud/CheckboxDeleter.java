package pl.uwm.projektzespolowy.services.checkbox.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class CheckboxDeleter {

    private final CheckboxRepository checkboxRepository;

    public void deleteCheckboxById(Long id) {
        checkboxRepository.deleteById(id);
    }

}
