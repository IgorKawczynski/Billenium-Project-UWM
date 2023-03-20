package pl.uwm.projektzespolowy.services.color.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.color.Color;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Service
@RequiredArgsConstructor
class ColorUpdater {

    private final ColorRepository colorRepository;

    public Color changeColorTitle(Color color, String newTitle) {
        color.changeTitle(new Title(newTitle));
        return colorRepository.save(color);
    }

}
