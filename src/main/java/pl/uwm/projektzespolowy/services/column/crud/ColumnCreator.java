package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.PositionableList;

import static pl.uwm.projektzespolowy.models.column.Column.DEFAULT_SIZE;

@Component
@RequiredArgsConstructor
class ColumnCreator {

    private final ColumnRepository columnRepository;

    public Column createColumn(Board board, String givenTitle) {
        var boardColumns = new PositionableList<>(board.getColumns());
        var position = board.getPositionForNewColumn();
        var column = new Column(new Title(givenTitle), DEFAULT_SIZE, position, board);

        boardColumns.withHigherOrEqualPositionThanGiven(column);
        boardColumns.moveRightAll();
        column.setPosition(position);

        columnRepository.saveAll(boardColumns.list());
        return columnRepository.saveAndFlush(column);
    }

}
