package pl.uwm.projektzespolowy.models.column;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
@Table(name = "columns")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Column extends BasicEntity implements Positionable {

    Title title;
    Integer cardsLimit;
    Position position;

    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    Board board;

    @OneToMany(mappedBy = "column",
               orphanRemoval = true)
    List<Card> cards;

    public final static int UNLIMITED_SIZE = 0;
    public final static int DEFAULT_SIZE = 3;

    public Column(Title title, Integer cardsLimit, Position position, Board board) {
        this.title = title;
        this.cardsLimit = cardsLimit;
        this.position = position;
        this.board = board;
        this.cards = new ArrayList<>();
    }

    public ColumnResponseDTO toDto() {
        return ColumnResponseDTO.builder()
                .id(this.id.toString())
                .title(this.title.toString())
                .cardsLimit(this.cardsLimit)
                .position(this.position.value())
                .cards(this.cards.stream()
                        .map(Card::toDto)
                        .sorted(Comparator.comparingInt(CardResponseDTO::position))
                        .toList())
                .build();
    }

    public Position getPositionForNewCard() {
        int cardsNumber = this.getCards().size();
        return new Position(cardsNumber);
    }

    public void add(Card card) {
        this.cards.add(card);
        card.setColumn(this);
    }

    public void remove(Card card) {
        this.cards.remove(card);
        card.setColumn(null);
    }

}
