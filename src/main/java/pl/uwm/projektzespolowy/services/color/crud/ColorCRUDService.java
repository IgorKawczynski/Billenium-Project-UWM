package pl.uwm.projektzespolowy.services.color.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.color.Color;
import pl.uwm.projektzespolowy.models.color.ColorResponseDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorCRUDService {

    private final ColorUpdater colorUpdater;
    private final ColorReader colorReader;

    public ColorResponseDTO changeColorTitle(Long colorId, String newTitle) {
        var color = colorReader.getColorById(colorId);
        return colorUpdater.changeColorTitle(color, newTitle).toDto();
    }

    public Color getColorById(Long colorId) {
        return colorReader.getColorById(colorId);
    }

    public List<Color> getAllColorsByBoardId(Long boardId) {
        return colorReader.getAllColorsByBoardId(boardId);
    }

}
