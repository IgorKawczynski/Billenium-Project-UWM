package pl.uwm.projektzespolowy.models.user;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.card.Card;

import javax.persistence.*;
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
    String avatarPath;

    @Enumerated(EnumType.STRING)
    AvatarColor avatarColor;

    @ManyToMany(mappedBy = "assignedUsers")
    Set<Board> boards;
    @ManyToMany(mappedBy = "assignedUsers")
    Set<Card> cards;

    public User(String email, String password, String firstName, String lastName, AvatarColor avatarColor) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.boards = new HashSet<>();
        this.cards = new HashSet<>();
        this.avatarPath = null;
        this.avatarColor = avatarColor;
    }

    public UserResponseDTO toDto() {
        return UserResponseDTO
                .builder()
                .id(this.id.toString())
                .email(this.email)
                .firstName(this.firstName)
                .lastName(this.lastName)
                .avatarPath(this.avatarPath)
                .avatarColor(this.avatarColor.getValue())
                .build();
    }

    public UserBoardAssignmentDTO toBoardDto(Board board) {
        return UserBoardAssignmentDTO
                .builder()
                .id(this.id.toString())
                .email(this.email)
                .firstName(this.firstName)
                .lastName(this.lastName)
                .avatarPath(this.avatarPath)
                .avatarColor(this.avatarColor.getValue())
                .remainingAssignments(calculateRemainingAssignments(board))
                .build();
    }

    public String getFullName() {
        return firstName + " " + lastName;
    }

    public Integer calculateRemainingAssignments(Board board) {
        var wipLimit = board.getWipLimit();
        return wipLimit - getTasksAssignedCount(board);
    }

    public Integer getTasksAssignedCount(Board board) {
        return board.getColumns().stream()
                .flatMap(column -> column.getCells().stream())
                .flatMap(cell -> cell.getCards().stream())
                .filter(card -> card.getAssignedUsers().stream().anyMatch(user -> user.getId().equals(this.getId())))
                .mapToInt(card -> 1)
                .sum();
    }

}
