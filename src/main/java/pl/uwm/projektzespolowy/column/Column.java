package pl.uwm.projektzespolowy.column;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import pl.uwm.projektzespolowy.basic.BasicEntity;
import pl.uwm.projektzespolowy.board.Board;
import pl.uwm.projektzespolowy.card.Card;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "columns")
@NoArgsConstructor
public class Column extends BasicEntity {

    private String title;
    private Integer cardsLimit;
    private Integer position;
    @ManyToOne
    @JoinColumn(name = "board_id", referencedColumnName = "id")
    private Board board;

    @OneToMany(mappedBy = "column",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<Card> cards;

    public final static int UNLIMITED_SIZE = 0;
    public final static int DEFAULT_SIZE = 3;

    public Column(String title, Integer cardsLimit, Integer position, Board board) {
        this.title = title;
        this.cardsLimit = cardsLimit;
        this.position = position;
        this.board = board;
        this.cards = new ArrayList<>();
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
