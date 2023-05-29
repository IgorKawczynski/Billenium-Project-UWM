package pl.uwm.projektzespolowy.services.color;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.color.ColorResponseDTO;
import pl.uwm.projektzespolowy.models.color.ColorUpdateDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/colors")
public class ColorController {

    private final ColorFacade colorFacade;

    @GetMapping("/{colorId}")
    @ResponseStatus(HttpStatus.OK)
    public ColorResponseDTO getColorById(@PathVariable Long colorId) {
        return colorFacade.getColorById(colorId);
    }

    @GetMapping("/{boardId}/all")
    public ResponseEntity<List<ColorResponseDTO>> getAllColorsByBoardId(@PathVariable Long boardId) {
        var colors = colorFacade.getAllColorsByBoardId(boardId);
        return colors.size() > 0 ? ResponseEntity.ok(colors) : ResponseEntity.noContent().build();
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public ColorResponseDTO changeColorTitle(@RequestBody ColorUpdateDTO colorUpdateDTO) {
        return colorFacade.changeColorTitle(colorUpdateDTO);
    }

}
