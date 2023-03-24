package pl.uwm.projektzespolowy.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.card.Card;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BasicEntity {

    String email;
    String password;
    String firstName;
    String lastName;

    @ManyToMany(mappedBy = "assignedUsers")
    Set<Board> boards;
    @ManyToMany(mappedBy = "assignedUsers")
    Set<Card> cards;

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.boards = new HashSet<>();
        this.cards = new HashSet<>();
    }

    public UserResponseDTO toDto() {
        return UserResponseDTO
                .builder()
                .id(this.id.toString())
                .firstName(this.firstName)
                .lastName(this.lastName)
                .build();
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

}
