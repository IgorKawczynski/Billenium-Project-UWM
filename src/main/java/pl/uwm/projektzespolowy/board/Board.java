package pl.uwm.projektzespolowy.board;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import pl.uwm.projektzespolowy.basic.BasicEntity;
import pl.uwm.projektzespolowy.board.dtos.BoardResponseDTO;
import pl.uwm.projektzespolowy.column.Column;
import pl.uwm.projektzespolowy.user.User;

import java.util.*;

import static pl.uwm.projektzespolowy.column.Column.DEFAULT_SIZE;
import static pl.uwm.projektzespolowy.column.Column.UNLIMITED_SIZE;

@Entity
@Table(name = "boards")
@NoArgsConstructor
public class Board extends BasicEntity {

    private String title;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", referencedColumnName = "id")
    private User creator;

    @ManyToMany(mappedBy = "boards")
    private Set<User> assignedUsers;

    @OneToMany(mappedBy = "board",
              cascade = { CascadeType.MERGE,CascadeType.PERSIST },
              orphanRemoval = true)
    private List<Column> columns;

    public Board(String title, User creator) {
        this.title = title;
        this.creator = creator;
        this.assignedUsers = new HashSet<>(Collections.singletonList(creator));
        this.columns = List.of(
                new Column("Todo", UNLIMITED_SIZE, 0, this),
                new Column("In progress", DEFAULT_SIZE, 1, this),
                new Column("Done", UNLIMITED_SIZE, 2, this)
        );
    }

    public BoardResponseDTO toDto() {
        return new BoardResponseDTO();
    }

    public void assign(Column column) {
        this.columns.add(column);
    }

    public void assign(User user) {
        this.assignedUsers.add(user);
    }

    public String getTitle() {
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
