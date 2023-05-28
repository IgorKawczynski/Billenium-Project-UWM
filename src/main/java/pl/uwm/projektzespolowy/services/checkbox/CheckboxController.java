package pl.uwm.projektzespolowy.services.checkbox;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.checkbox.CheckboxCreateDTO;
import pl.uwm.projektzespolowy.models.checkbox.CheckboxResponseDTO;
import pl.uwm.projektzespolowy.models.checkbox.CheckboxUpdateDTO;

import java.util.List;

@RestController
@RequestMapping("/api/checkboxes")
@RequiredArgsConstructor
public class CheckboxController {

    private final CheckboxFacade checkboxFacade;

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CheckboxResponseDTO createCheckbox(@RequestBody CheckboxCreateDTO checkboxCreateDTO) {
        return checkboxFacade.creteCheckbox(checkboxCreateDTO);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"checkboxId"})
    @ResponseStatus(HttpStatus.OK)
    public CheckboxResponseDTO getCheckboxById(@RequestParam Long checkboxId) {
        return checkboxFacade.getCheckboxById(checkboxId);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"cardId"})
    public ResponseEntity<List<CheckboxResponseDTO>> getAllCheckboxesByCardId(@RequestParam Long cardId) {
        var checkboxes = checkboxFacade.getAllCheckboxesByCardId(cardId);
        return checkboxes.size() > 0 ? ResponseEntity.ok(checkboxes) : ResponseEntity.noContent().build();
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CheckboxResponseDTO updateCheckbox(@RequestBody CheckboxUpdateDTO checkboxUpdateDTO) {
        return checkboxFacade.updateCheckbox(checkboxUpdateDTO);
    }

    @PutMapping("/checked/{checkboxId}")
    @ResponseStatus(HttpStatus.OK)
    public CheckboxResponseDTO markAsChecked(@PathVariable Long checkboxId) {
        return checkboxFacade.markAsChecked(checkboxId);
    }

    @PutMapping("/unchecked/{checkboxId}")
    @ResponseStatus(HttpStatus.OK)
    public CheckboxResponseDTO markAsUnchecked(@PathVariable Long checkboxId) {
        return checkboxFacade.markAsUnchecked(checkboxId);
    }

    @DeleteMapping("/{checkboxId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCheckboxById(@PathVariable Long checkboxId) {
        checkboxFacade.deleteCheckbox(checkboxId);
    }

}
