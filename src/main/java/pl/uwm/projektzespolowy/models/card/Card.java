package pl.uwm.projektzespolowy.models.card;

import javax.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;
import pl.uwm.projektzespolowy.models.color.ColorValue;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "cards")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Card extends BasicEntity implements Positionable {

    Title title;
    String description;
    Position position;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    },
            fetch = FetchType.LAZY)
    @JoinTable(name = "users_cards",
            joinColumns = @JoinColumn(name = "card_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    Set<User> assignedUsers;

    @Enumerated(EnumType.STRING)
    ColorValue color;

    @ManyToOne
    @JoinColumn(name = "cell_id", referencedColumnName = "id")
    Cell cell;

    @OneToMany(mappedBy = "card",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    List<Checkbox> checkboxes;


    public Card(Title title, String description, Cell cell, Position position) {
        this.title = title;
        this.description = description;
        this.cell = cell;
        this.position = position;
        this.assignedUsers = new HashSet<>();
        this.color = ColorValue.DEFAULT;
    }

    public CardResponseDTO toDto() {
        return CardResponseDTO
                .builder()
                .id(this.id.toString())
                .title(this.title.toString())
                .description(this.description)
                .position(this.position.value())
                .color(this.color.getValue())
                .assignedUsers(this.assignedUsers.stream()
                        .map(User::toDto)
                        .sorted(Comparator.comparing(UserResponseDTO::firstName)
                                .thenComparing(UserResponseDTO::lastName))
                        .collect(Collectors.toList()))
                .build();
    }

    public void assignUser(User user) {
        this.assignedUsers.add(user);
    }

    public void removeUser(User user) {
        this.assignedUsers.remove(user);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Card)) return false;
        return this.id != null && this.id.equals(((Card) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
