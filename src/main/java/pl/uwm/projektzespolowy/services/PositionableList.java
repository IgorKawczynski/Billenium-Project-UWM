package pl.uwm.projektzespolowy.services;

import pl.uwm.projektzespolowy.exceptions.ElementDoesNotExists;
import pl.uwm.projektzespolowy.models.Positionable;
import pl.uwm.projektzespolowy.models.valueobjects.Position;

import java.util.Comparator;
import java.util.Iterator;
import java.util.List;
import java.util.function.Consumer;

public class PositionableList<T extends Positionable> implements Iterable<T>{

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
                .orElseThrow(() -> new ElementDoesNotExists("Element with position " + previousPosition + " does not exist!"));
    }

    public T get(int position) {
        return this.positionables.stream()
                .filter(positionable -> positionable.getPosition().value() == position)
                .findFirst()
                .orElseThrow(() -> new ElementDoesNotExists("Element with position " + position + " does not exist!"));
    }

    public T getFirstElement() {
        return this.positionables.stream()
                .min(Comparator.comparingInt(position -> position.getPosition().value()))
                .orElseThrow(() -> new ElementDoesNotExists("Positionable list is empty!"));
    }

    public T getLastElement() {
        return this.positionables.stream()
                        .max(Comparator.comparingInt(position -> position.getPosition().value()))
                        .orElseThrow(() -> new ElementDoesNotExists("Positionable list is empty!"));
    }

    @Override
    public Iterator<T> iterator() {
        return new PositionableListIterator();
    }

    private class PositionableListIterator implements Iterator<T> {

        private int currentPosition = 0;
        @Override
        public boolean hasNext() {
            return currentPosition < list().size() && get(currentPosition) != null;
        }

        @Override
        public T next() {
            return get(currentPosition++);
        }
    }

}
