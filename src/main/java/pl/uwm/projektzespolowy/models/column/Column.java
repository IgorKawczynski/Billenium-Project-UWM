package pl.uwm.projektzespolowy.models.column;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.cell.CellResponseDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
@Table(name = "columns")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Column extends BasicEntity implements Positionable {

    Title title;
    Integer cardsLimit;
    Position position;
    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    Board board;
    @OneToMany(mappedBy = "column", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Cell> cells;

    public final static int UNLIMITED_SIZE = 0;
    public final static int DEFAULT_SIZE = 3;

    public Column(Title title, Integer cardsLimit, Position position, Board board) {

        this.title = title;
        this.cardsLimit = cardsLimit;
        this.position = position;
        this.board = board;

        ArrayList<Cell> cells = new ArrayList<>();
        for(int i=0; i<board.getRows().size(); i++) {
            cells.add(new Cell(this, new Position(i)));
        }
        this.cells = cells;
    }

    public ColumnResponseDTO toDto() {
        return ColumnResponseDTO
                .builder()
                .id(this.id.toString())
                .title(this.title.toString())
                .cardsLimit(this.cardsLimit)
                .position(this.position.value())
                .cells(this.cells.stream()
                        .map(Cell::toDto)
                        .sorted(Comparator.comparingInt(CellResponseDTO::position))
                        .toList())
                .build();
    }

}
