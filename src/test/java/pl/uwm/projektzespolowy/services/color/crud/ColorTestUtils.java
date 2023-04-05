package pl.uwm.projektzespolowy.services.color.crud;

import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.color.Color;

import java.util.ArrayList;
import java.util.Arrays;

public class ColorTestUtils {

    public static Color createColor(Long id) {
        var color = new Color();
        color.setId(id);
        return color;
    }

    public static Board createBoardWithColors() {
        var board = new Board();
        board.setId(1L);
        board.setColors(createColors());
        return board;
    }

    public static ArrayList<Color> createColors() {
        var firstColor = createColor(1L);
        var secondColor = createColor(2L);
        var thirdColor = createColor(3L);
        var fourthColor = createColor(4L);
        var fifthColor = createColor(5L);
        var sixthColor = createColor(6L);
        return new ArrayList<>(Arrays.asList(firstColor, secondColor, thirdColor, fourthColor, fifthColor, sixthColor));
    }

}
