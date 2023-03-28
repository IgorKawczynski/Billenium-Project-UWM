package pl.uwm.projektzespolowy.services.color.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.color.Color;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Service
@RequiredArgsConstructor
class ColorUpdater {

    private final ColorRepository colorRepository;

    public Color changeColorTitle(Color colorToChange, String newTitle) {
        if (newTitle != null) {
            colorToChange.changeTitle(new Title(newTitle));
        }
        return colorRepository.save(colorToChange);
    }

}
