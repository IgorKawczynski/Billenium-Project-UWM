package pl.uwm.projektzespolowy.card;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import pl.uwm.projektzespolowy.basic.BasicEntity;
import pl.uwm.projektzespolowy.column.Column;
import pl.uwm.projektzespolowy.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cards")
@NoArgsConstructor
public class Card extends BasicEntity {

    private String title;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "column_id")
    private Column column;

    @ManyToMany(mappedBy = "cards")
    private Set<User> assignedUsers;

    public Card(String title, String description, Column column) {
        this.title = title;
        this.description = description;
        this.column = column;
        this.assignedUsers = new HashSet<>();
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Column getColumn() {
        return column;
    }

    public Set<User> getAssignedUsers() {
        return assignedUsers;
    }
}
