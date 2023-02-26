package pl.uwm.projektzespolowy.user;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import pl.uwm.projektzespolowy.basic.BasicEntity;
import pl.uwm.projektzespolowy.board.Board;
import pl.uwm.projektzespolowy.card.Card;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@NoArgsConstructor
public class User extends BasicEntity {

    private String email;
    private String password;
    private String firstName;
    private String lastName;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
            },
            fetch = FetchType.LAZY)
    @JoinTable(name = "users_boards",
        joinColumns = @JoinColumn(name = "board_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<Board> boards;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
            },
            fetch = FetchType.LAZY)
    @JoinTable(name = "users_cards",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "card_id")
    )
    private Set<Card> cards;

    public User(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.boards = new HashSet<>();
        this.cards = new HashSet<>();
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
