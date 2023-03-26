package pl.uwm.projektzespolowy.services;

import pl.uwm.projektzespolowy.exceptions.ElementDoesNotExists;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.List;
import java.util.function.Consumer;

public class PositionableList<T extends Positionable> {

    private final Consumer<Positionable> moveLeft = positionable -> positionable.getPosition().moveLeft();
    private final Consumer<Positionable> moveRight = positionable -> positionable.getPosition().moveRight();
    private List<T> positionables;

    public PositionableList(List<T> positionables) {
        this.positionables = positionables;
    }

    public void moveLeftAll() {
        this.positionables = this.positionables
                                    .stream()
                                    .peek(moveLeft)
                                    .toList();
    }

    public void moveRightAll() {
        this.positionables = this.positionables
                                    .stream()
                                    .peek(moveRight)
                                    .toList();
    }

    public void withHigherOrEqualPositionThanGiven(T givenPositionable) {
        this.positionables = this.positionables
                                    .stream()
                                    .filter(positionable -> !positionable.equals(givenPositionable))
                                    .filter(positionable -> positionable.getPosition().compareTo(givenPositionable.getPosition()) >= 0)
                                    .toList();
    }

    public void withPositionInRange(Position lowerBound, Position upperBound) {
        this.positionables = this.positionables
                .stream()
                .filter(positionable -> positionable.getPosition().compareTo(lowerBound) >= 0
                        && positionable.getPosition().compareTo(upperBound) <= 0)
                .toList();
    }

    public List<T> list() {
        return this.positionables;
    }

    public void moveInRange(Position currentPosition, Position newPosition) {
        if (newPosition.value() < currentPosition.value()) {
            this.withPositionInRange(newPosition, currentPosition);
            this.moveRightAll();
        }
        if (newPosition.value() > currentPosition.value()) {
            this.withPositionInRange(currentPosition, newPosition);
            this.moveLeftAll();
        }
    }

    public T getPreviousElement(T positionable) {
        var previousPosition = positionable.getPosition().value() - 1;
        return this.positionables.stream()
                .filter(element -> element.getPosition().value() == previousPosition)
                .findFirst()
                .orElseThrow(() -> new ElementDoesNotExists("Element with position " + previousPosition + "doesn't exists!"));
    }

    public T get(int position) {
        return this.positionables.stream()
                .filter(positionable -> positionable.getPosition().value() == position)
                .findFirst()
                .orElseThrow(() -> new ElementDoesNotExists("Element with position " + position + "doesn't exists!"));
    }

}
