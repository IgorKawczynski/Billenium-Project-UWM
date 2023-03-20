package pl.uwm.projektzespolowy.models.board;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.row.RowResponseDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.*;

import static pl.uwm.projektzespolowy.models.column.Column.DEFAULT_SIZE;
import static pl.uwm.projektzespolowy.models.column.Column.UNLIMITED_SIZE;

@Entity
@Table(name = "boards")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Board extends BasicEntity {

    Title title;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    User creator;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    },
            fetch = FetchType.LAZY)
    @JoinTable(name = "users_boards",
            joinColumns = @JoinColumn(name = "board_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> assignedUsers;

    @OneToMany(mappedBy = "board",
              cascade = CascadeType.ALL,
              orphanRemoval = true)
    List<Column> columns;

    @OneToMany(mappedBy = "board",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    List<Color> colors;

    @OneToMany(mappedBy = "board",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    List<Row> rows;

    public Board(Title title, User creator) {
        this.title = title;
        this.creator = creator;
        this.assignedUsers = new HashSet<>();
        this.assignedUsers.add(creator);
        this.columns = List.of(
                new Column(new Title("Todo"), UNLIMITED_SIZE, Position.first(), this),
                new Column(new Title("In progress"), DEFAULT_SIZE, Position.second(), this),
                new Column(new Title("Done"), UNLIMITED_SIZE, Position.third(), this)
        );
        this.colors = List.of(
                new Color(new Title("Color 1"), ColorValue.DEFAULT, this),
                new Color(new Title("Color 2"), ColorValue.DEFAULT, this),
                new Color(new Title("Color 3"), ColorValue.DEFAULT, this),
                new Color(new Title("Color 4"), ColorValue.DEFAULT, this),
                new Color(new Title("Color 5"), ColorValue.DEFAULT, this)
        );
        this.rows = List.of(
                new Row(new Title("Tasks"), Position.first(), this)
        );
    }

    public BoardResponseDTO toDto() {
        return BoardResponseDTO.builder()
                .id(String.valueOf(this.id))
                .title(this.title.toString())
                .creatorName(this.creator.getFullName())
                .assignedUsers(this.assignedUsers.stream()
                        .map(User::toDto)
                        .toList())
                .columnList(this.columns.stream()
                        .map(Column::toDto)
                        .sorted(Comparator.comparingInt(ColumnResponseDTO::position))
                        .toList())
                .rowList(this.rows.stream()
                        .map(Row::toDto)
                        .sorted(Comparator.comparingInt(RowResponseDTO::position))
                        .toList())
                .build();
    }

    public Position getPositionForNewColumn() {
        int columnsNumber = this.getColumns().size();
        if (columnsNumber > 0 ) columnsNumber -= 1;
        return new Position(columnsNumber);
    }

    public void deleteColumn(Column column) {
        this.columns.remove(column);
        column.setBoard(null);
    }

    public Position getPositionForNewRow() {
        int rowsNumber = this.getRows().size();
        if (rowsNumber > 0 ) rowsNumber -= 1;
        return new Position(rowsNumber);
    }

    public void deleteRow(Row row) {
        this.rows.remove(row);
        row.setBoard(null);
    }

}
