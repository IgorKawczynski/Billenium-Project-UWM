package pl.uwm.projektzespolowy.services.checkbox.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Component
@RequiredArgsConstructor
public class CheckboxCreator {

    private final CheckboxRepository checkboxRepository;

    public Checkbox createCheckbox(Card card, String givenTitle) {
        var title = new Title(givenTitle);
        return checkboxRepository.saveAndFlush(new Checkbox(title, card));
    }

}
