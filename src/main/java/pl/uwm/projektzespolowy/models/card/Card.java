package pl.uwm.projektzespolowy.models.card;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cards")
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Card extends BasicEntity implements Positionable {

    Title title;
    String description;

    Position position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "column_id")
    Column column;

    @ManyToMany(mappedBy = "cards")
    Set<User> assignedUsers;

    public Card(Title title, String description, Column column, Position position) {
        this.title = title;
        this.description = description;
        this.column = column;
        this.position = position;
        this.assignedUsers = new HashSet<>();
    }

    public CardResponseDTO toDto() {
        return CardResponseDTO.builder()
                .id(this.id.toString())
                .title(this.title.toString())
                .description(this.description)
                .position(this.position.value())
                .build();
    }

    public Position getPosition() {
        return position;
    }

    public Title getTitle() {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Card card)) return false;
        return this.id != null && this.id.equals(((Card) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
