package pl.uwm.projektzespolowy.models.cell;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.List;

@Entity
@Table(name = "cells")
@Setter
@Getter
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cell extends BasicEntity implements Positionable {

    @ManyToOne
    @JoinColumn(name = "column_id", referencedColumnName = "id")
    Column column;

    @ManyToOne
    @JoinColumn(name = "row_id", referencedColumnName = "id")
    Row row;

    @OneToMany(mappedBy = "cell", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Card> cards;

    Position position;

    public CellResponseDTO toDto() {
        return CellResponseDTO.builder()
                .id(this.id.toString())
                .position(this.position.value())
                .cards(this.cards.stream().map(Card::toDto).toList())
                .build();
    }

    public Position getPositionForNewCard() {
        int cardsNumber = this.getCards().size();
        return new Position(cardsNumber);
    }

    public void add(Card card) {
        this.cards.add(card);
        card.setCell(this);
    }

    public void remove(Card card) {
        this.cards.remove(card);
        card.setCell(null);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof Cell))
            return false;
        return this.id != null && this.id.equals(((Cell) o).getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
