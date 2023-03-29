package pl.uwm.projektzespolowy.models.cell;

import javax.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.basic.BasicEntity;
import pl.uwm.projektzespolowy.models.card.Card;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.Comparator;
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

    @OneToMany(mappedBy = "cell", cascade = CascadeType.ALL, orphanRemoval = true)
    List<Card> cards;

    Position position;

    public Cell(Column column, Position position){
        this.column = column;
        this.position = position;
    }

    public CellResponseDTO toDto() {
        return CellResponseDTO
                .builder()
                .id(this.id.toString())
                .position(this.position.value())
                .cards(this.cards != null
                        ? this.cards.stream()
                           .map(Card::toDto)
                           .sorted(Comparator.comparingInt(CardResponseDTO::position))
                           .toList()
                        : null)
                .build();
    }

    public Position getPositionForNewCard() {
        int cardsNumber = this.getCards().size();
        return new Position(cardsNumber);
    }

    public void addAll(List<Card> cards) {
        cards.forEach(card -> {
            card.setPosition(this.getPositionForNewCard());
            this.add(card);
        });
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
