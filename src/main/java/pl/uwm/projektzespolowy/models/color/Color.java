package pl.uwm.projektzespolowy.models.color;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Entity
@NoArgsConstructor
@Getter
public class Color extends BasicEntity {

    private Title title;
    private ColorValue colorValue;

    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    private Board board;

    protected Color(Title title, Board board) {
        this.title = title;
        this.board = board;
        this.colorValue = ColorValue.DEFAULT;
    }

    public static Color DefaultColor(Title title, Board board) {
        return new Color(title, board);
    }

    public void changeTitle(Title newTitle) {
        this.title = newTitle;
    }

    public void changeColorValue(ColorValue colorValue) {
        this.colorValue = colorValue;
    }

}
