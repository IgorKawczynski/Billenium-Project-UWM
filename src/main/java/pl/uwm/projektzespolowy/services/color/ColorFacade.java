package pl.uwm.projektzespolowy.services.color;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.color.Color;
import pl.uwm.projektzespolowy.models.color.ColorUpdateDTO;
import pl.uwm.projektzespolowy.models.color.ColorResponseDTO;
import pl.uwm.projektzespolowy.services.color.crud.ColorCRUDService;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorFacade {

    private final ColorCRUDService colorCRUDService;

    public ColorResponseDTO changeColorTitle(ColorUpdateDTO colorUpdateDTO) {
        var colorId = Long.parseLong(colorUpdateDTO.colorId());
        return colorCRUDService.changeColorTitle(colorId, colorUpdateDTO.newTitle());
    }

    public ColorResponseDTO getColorById(Long colorId) {
        return colorCRUDService.getColorById(colorId).toDto();
    }

    public List<ColorResponseDTO> getAllColorsByBoardId(Long boardId) {
        return colorCRUDService
                .getAllColorsByBoardId(boardId)
                .stream().map(Color::toDto)
                .sorted(Comparator.comparing(ColorResponseDTO::id))
                .toList();
    }

}
