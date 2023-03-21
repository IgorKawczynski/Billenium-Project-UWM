package pl.uwm.projektzespolowy.models.row;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rows")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Row extends BasicEntity implements Positionable {

    Title title;
    Position position;

    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    Board board;

    @OneToMany(mappedBy = "row", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Cell> cells;

    public Row(Title title, Position position, Board board) {
        this.title = title;
        this.position = position;
        this.board = board;
        this.cells = new ArrayList<>();
    }

    public RowResponseDTO toDto() {
        return RowResponseDTO
                .builder()
                .id(this.id.toString())
                .title(this.title.toString())
                .position(this.position.value())
                .build();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Row))
            return false;
        return this.id != null && this.id.equals(((Row) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
