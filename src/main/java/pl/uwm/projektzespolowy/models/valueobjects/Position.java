package pl.uwm.projektzespolowy.models.valueobjects;

import javax.persistence.Embeddable;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class Position implements Comparable<Position>{

    private Integer position;

    public Position(int position) {
        this.position = position;
    }

    public static Position first() {
        return new Position(0);
    }

    public static Position second() {
        return new Position(1);
    }

    public static Position third() {
        return new Position(2);
    }

    public int value() {
        return this.position;
    }

    public void moveRight() {
        this.position = position + 1;
    }

    public void moveLeft() {
        this.position = position - 1;
    }

    public void moveTo(int position) {
        this.position = position;
    }

    @Override
    public int compareTo(Position otherPosition) {
        return Integer.compare(this.position, otherPosition.position);
    }

}
