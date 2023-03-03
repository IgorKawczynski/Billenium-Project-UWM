package pl.uwm.projektzespolowy.models.column;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.card.Card;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "columns")
@Setter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Column extends BasicEntity {

    String title;
    Integer cardsLimit;
    Integer position;
    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    Board board;

    @OneToMany(mappedBy = "column",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    List<Card> cards;

    public final static int UNLIMITED_SIZE = 0;
    public final static int DEFAULT_SIZE = 3;

    public Column(String title, Integer cardsLimit, Integer position, Board board) {
        this.title = title;
        this.cardsLimit = cardsLimit;
        this.position = position;
        this.board = board;
        this.cards = new ArrayList<>();
    }

    public ColumnResponseDTO toDto() {
        return ColumnResponseDTO.builder()
                .id(this.id.toString())
                .title(this.title)
                .cardsLimit(this.cardsLimit)
                .position(this.position)
                .cards(this.cards.stream()
                        .map(Card::toDto)
                        .toList())
                .build();
    }

    public void assign(Card card) {
        this.cards.add(card);
    }

    public String getTitle() {
        return title;
    }

    public Integer getCardsLimit() {
        return cardsLimit;
    }

    public Integer getPosition() {
        return position;
    }

    public Board getBoard() {
        return board;
    }

    public List<Card> getCards() {
        return cards;
    }
}
