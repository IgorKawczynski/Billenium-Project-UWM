package pl.uwm.projektzespolowy.models.board;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.color.Color;
import pl.uwm.projektzespolowy.models.color.ColorResponseDTO;
import pl.uwm.projektzespolowy.models.color.ColorValue;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.row.RowResponseDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import javax.persistence.*;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    @ManyToMany(fetch = FetchType.LAZY)
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
    List<Row> rows;

    @OneToMany(mappedBy = "board",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    List<Color> colors;


    public Board(Title title, User creator) {

        this.title = title;
        this.creator = creator;
        this.assignedUsers = new HashSet<>();
        this.assignedUsers.add(creator);
        this.rows = List.of(
                new Row(new Title("Default"), Position.first(), this)
        );
        this.columns = List.of(
                new Column(new Title("Todo"), UNLIMITED_SIZE, Position.first(), this),
                new Column(new Title("In progress"), DEFAULT_SIZE, Position.second(), this),
                new Column(new Title("Done"), UNLIMITED_SIZE, Position.third(), this)
        );
        this.colors = List.of(
                new Color(new Title("Default"), ColorValue.DEFAULT, this),
                new Color(new Title("Color 1"), ColorValue.PURPLE, this),
                new Color(new Title("Color 2"), ColorValue.BLUE, this),
                new Color(new Title("Color 3"), ColorValue.GREEN, this),
                new Color(new Title("Color 4"), ColorValue.YELLOW, this),
                new Color(new Title("Color 5"), ColorValue.RED, this)
        );
    }

    public BoardResponseDTO toDto() {
        return BoardResponseDTO
                .builder()
                .id(String.valueOf(this.id))
                .title(this.title.toString())
                .creatorId(String.valueOf(this.creator.getId()))
                .creatorName(this.creator.getFullName())
                .assignedUsers(this.assignedUsers.stream()
                        .map(User::toDto)
                        .sorted(Comparator.comparing(UserResponseDTO::firstName)
                                .thenComparing(UserResponseDTO::lastName))
                        .toList())
                .columnList(this.columns.stream()
                        .map(Column::toDto)
                        .sorted(Comparator.comparingInt(ColumnResponseDTO::position))
                        .toList())
                .rowList(this.rows.stream()
                        .map(Row::toDto)
                        .sorted(Comparator.comparingInt(RowResponseDTO::position))
                        .toList())
                .colorList(this.colors.stream()
                        .map(Color::toDto)
                        .sorted(Comparator.comparing(ColorResponseDTO::id))
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
        if (rowsNumber > 0) rowsNumber -= 1;
        return new Position(rowsNumber);
    }

    public void deleteRow(Row row) {
        this.rows.remove(row);
        row.setBoard(null);
    }

    public void assignUser(User user) {
        this.assignedUsers.add(user);
    }

    public void removeUser(User user) {
        this.assignedUsers.remove(user);
    }

}
