package pl.uwm.projektzespolowy.models.board;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.*;

import static pl.uwm.projektzespolowy.models.column.Column.DEFAULT_SIZE;
import static pl.uwm.projektzespolowy.models.column.Column.UNLIMITED_SIZE;

@Entity
@Table(name = "boards")
@Setter
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
    }

    public BoardResponseDTO toDto() {
        return BoardResponseDTO.builder()
                .id(String.valueOf(this.id))
                .title(this.title.toString())
                .creatorName(this.creator.getFullName())
                .assignedUsers(this.assignedUsers.stream()
                        .map(User::toUserResponseDTO)
                        .toList())
                .columnList(this.columns.stream()
                        .map(Column::toDto)
                        .sorted(Comparator.comparingInt(ColumnResponseDTO::position))
                        .toList())
                .build();
    }

    public void assign(Column column) {
        this.columns.add(column);
    }

    public void deleteColumn(Column column) {
        this.columns.remove(column);
        column.setBoard(null);
    }

    public void assign(User user) {
        this.assignedUsers.add(user);
    }

    public Title getTitle() {
        return title;
    }

    public User getCreator() {
        return creator;
    }

    public Set<User> getAssignedUsers() {
        return assignedUsers;
    }

    public List<Column> getColumns() {
        return columns;
    }
}
