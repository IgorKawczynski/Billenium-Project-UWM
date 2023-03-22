package pl.uwm.projektzespolowy.services.color.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.color.Color;

import java.util.List;

@Service
@RequiredArgsConstructor
class ColorReader {

    private final ColorRepository colorRepository;

    public Color getColorById(Long colorId) {
        return colorRepository
                .findById(colorId)
                .orElseThrow(
                    () -> new EntityNotFoundException("color", "Color with id: " + colorId + " does not exist!")
                );
    }

    public List<Color> getAllColorsByBoardId(Long boardId) {
        return colorRepository.findAllByBoardId(boardId);
    }

}
