package pl.uwm.projektzespolowy.services;

import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.Positionable;

import java.util.List;
import java.util.function.Consumer;

@Component
public class PositionableService<T extends Positionable> {

    Consumer<Positionable> moveLeft = positionable -> positionable.getPosition().moveLeft();
    Consumer<Positionable> moveRight = positionable -> positionable.getPosition().moveRight();

    public List<T> moveLeftAllDemanding(List<T> positionableList) {
        return positionableList.stream()
                .peek(moveLeft)
                .toList();
    }

    public List<T> moveRightAllDemanding(List<T> positionableList) {
        return positionableList.stream()
                .peek(moveRight)
                .toList();
    }

    public List<T> positionablesWithHigherPositionThanGivenPositionable
            (T givenPositionable, List<T> positionables) {
        return positionables.stream()
                .filter(positionable -> positionable.getPosition().compareTo(givenPositionable.getPosition()) > 0)
                .toList();
    }

}
