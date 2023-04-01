package pl.uwm.projektzespolowy.services.checkbox;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;
import pl.uwm.projektzespolowy.models.checkbox.CheckboxCreateDTO;
import pl.uwm.projektzespolowy.models.checkbox.CheckboxResponseDTO;
import pl.uwm.projektzespolowy.models.checkbox.CheckboxUpdateDTO;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.services.checkbox.crud.CheckboxCRUDService;

import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CheckboxFacade {

    private final CheckboxCRUDService checkboxCRUDService;
    private final CardCRUDService  cardCRUDService;

    public CheckboxResponseDTO creteCheckbox(CheckboxCreateDTO checkboxCreateDTO) {
        var cardId = Long.parseLong(checkboxCreateDTO.cardId());
        var card = cardCRUDService.getCardById(cardId);
        return checkboxCRUDService.createCheckbox(card, checkboxCreateDTO.title()).toDto();
    }

    public CheckboxResponseDTO getCheckboxById(Long checkboxId) {
        return checkboxCRUDService.getCheckboxById(checkboxId).toDto();
    }

    public List<CheckboxResponseDTO> getAllCheckboxesByCardId(Long cardId) {
        return checkboxCRUDService.getAllCheckboxesByCardId(cardId)
                .stream()
                .map(Checkbox::toDto)
                .sorted(Comparator.comparing(CheckboxResponseDTO::id))
                .toList();
    }

    public CheckboxResponseDTO updateCheckbox(CheckboxUpdateDTO checkboxUpdateDTO) {
        var checkboxId = Long.parseLong(checkboxUpdateDTO.checkboxId());
        return checkboxCRUDService.updateCheckbox(checkboxId, checkboxUpdateDTO.title()).toDto();
    }

    public CheckboxResponseDTO markAsChecked(Long checkboxId) {
        return checkboxCRUDService.markAsChecked(checkboxId).toDto();
    }

    public CheckboxResponseDTO markAsUnchecked(Long checkboxId) {
        return checkboxCRUDService.markAsUnchecked(checkboxId).toDto();
    }

    public void deleteCheckbox (Long checkboxId) {
        checkboxCRUDService.deleteCheckbox(checkboxId);
    }

}
