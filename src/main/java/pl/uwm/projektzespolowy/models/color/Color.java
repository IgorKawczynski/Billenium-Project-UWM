package pl.uwm.projektzespolowy.models.color;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Entity
@NoArgsConstructor
@Table(name = "colors")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Color extends BasicEntity {

    Title title;
    @Enumerated(EnumType.STRING)
    ColorValue value;

    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    Board board;

    public Color(Title title, ColorValue colorValue, Board board) {
        this.title = title;
        this.value = colorValue;
        this.board = board;
    }

    public ColorResponseDTO toDto() {
        return ColorResponseDTO.builder()
                .id(String.valueOf(this.id))
                .title(this.title.toString())
                .value(this.getColorValue())
                .build();
    }

    public String getColorValue() {
        return this.value.getValue();
    }

    public void changeTitle(Title newTitle) {
        this.title = newTitle;
    }

    public void changeColorValue(ColorValue colorValue) {
        this.value = colorValue;
    }

}
