package pl.uwm.projektzespolowy.card;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.basic.BasicEntity;
import pl.uwm.projektzespolowy.card.dtos.CardDTO;
import pl.uwm.projektzespolowy.column.Column;
import pl.uwm.projektzespolowy.user.User;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cards")
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Card extends BasicEntity {

    String title;
    String description;

    // TODO: add Position

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "column_id")
    Column column;

    @ManyToMany(mappedBy = "cards")
    Set<User> assignedUsers;

    public Card(String title, String description, Column column) {
        this.title = title;
        this.description = description;
        this.column = column;
        this.assignedUsers = new HashSet<>();
    }

    public CardDTO toDto() {
        return CardDTO.builder()
                .id(this.id)
                .title(this.title)
                .description(this.description)
                .build();
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
