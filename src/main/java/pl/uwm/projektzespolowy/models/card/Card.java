package pl.uwm.projektzespolowy.models.card;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;
import pl.uwm.projektzespolowy.models.checkbox.CheckboxResponseDTO;
import pl.uwm.projektzespolowy.models.color.ColorValue;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import javax.persistence.*;
import java.util.*;
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

    boolean isLocked;

    Long parentCardId;

    public Card(Title title, String description, Cell cell, Position position) {
        this.title = title;
        this.description = description;
        this.cell = cell;
        this.position = position;
        this.assignedUsers = new HashSet<>();
        this.color = ColorValue.DEFAULT;
        this.checkboxes = new ArrayList<>();
        this.isLocked = false;
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
                .checkboxes(this.checkboxes.stream()
                        .map(Checkbox::toDto)
                        .sorted(Comparator.comparing(CheckboxResponseDTO::id))
                        .toList())
                .isLocked(this.isLocked)
                .children(getChildren(this.cell.getColumn().getBoard()).stream()
                        .map(Card::toDto)
                        .toList())
                .build();
    }

    public void assignUser(User user) {
        this.assignedUsers.add(user);
    }

    public void removeUser(User user) {
        this.assignedUsers.remove(user);
    }

    public List<Card> getChildren(Board board) {
        List<Card> children = new ArrayList<>();
        var cardsInBoard = getAllCards(board);

        for (Card card : cardsInBoard) {
            if (card.getParentCardId() != null && card.getParentCardId().equals(this.getId())) {
                children.add(card);
            }
        }

        return children;
    }

    public List<Card> getAllCards(Board board) {
        List<Card> allCards = new ArrayList<>();

        for (Column column : board.getColumns()) {
            for (Cell cell : column.getCells()) {
                allCards.addAll(cell.getCards());
            }
        }

        return allCards;
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
