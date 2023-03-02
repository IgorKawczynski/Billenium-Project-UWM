package pl.uwm.projektzespolowy.models.user;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.card.Card;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BasicEntity {

    String email;
    String password;
    String firstName;
    String lastName;

    @ManyToMany(mappedBy = "assignedUsers")
    Set<Board> boards;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
            },
            fetch = FetchType.LAZY)
    @JoinTable(name = "users_cards",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "card_id")
    )
    Set<Card> cards;

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.boards = new HashSet<>();
        this.cards = new HashSet<>();
    }

    public UserResponseDTO toUserResponseDTO() {
        return UserResponseDTO.builder()
                .id(this.id)
                .firstName(this.firstName)
                .lastName(this.lastName)
                .build();
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Set<Board> getBoards() {
        return boards;
    }

    public Set<Card> getCards() {
        return cards;
    }
}
