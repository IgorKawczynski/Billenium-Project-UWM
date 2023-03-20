package pl.uwm.projektzespolowy.services.color;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.color.ColorRequestDTO;
import pl.uwm.projektzespolowy.models.color.ColorResponseDTO;
import pl.uwm.projektzespolowy.services.color.crud.ColorCRUDService;

@Service
@RequiredArgsConstructor
public class ColorFacade {

    private final ColorCRUDService colorCRUDService;

    public ColorResponseDTO changeColorTitle(ColorRequestDTO colorRequestDTO) {
        var colorId = Long.parseLong(colorRequestDTO.id());
        return colorCRUDService.changeColorTitle(colorId, colorRequestDTO.newTitle());
    }

}
