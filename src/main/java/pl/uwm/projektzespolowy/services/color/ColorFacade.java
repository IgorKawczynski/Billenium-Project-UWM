package pl.uwm.projektzespolowy.services.color;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.color.ColorUpdateDTO;
import pl.uwm.projektzespolowy.models.color.ColorResponseDTO;
import pl.uwm.projektzespolowy.services.color.crud.ColorCRUDService;

@Service
@RequiredArgsConstructor
public class ColorFacade {

    private final ColorCRUDService colorCRUDService;

    public ColorResponseDTO changeColorTitle(ColorUpdateDTO colorUpdateDTO) {
        var colorId = Long.parseLong(colorUpdateDTO.id());
        return colorCRUDService.changeColorTitle(colorId, colorUpdateDTO.newTitle());
    }

}
