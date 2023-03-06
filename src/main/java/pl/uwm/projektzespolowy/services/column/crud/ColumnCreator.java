package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.PositionableList;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.board.crud.BoardReader;
import pl.uwm.projektzespolowy.services.column.ColumnRepository;
import static pl.uwm.projektzespolowy.models.column.Column.DEFAULT_SIZE;

@Component
@RequiredArgsConstructor
public class ColumnCreator {

    private final BoardReader boardReader;
    private final ColumnRepository columnRepository;

    public Column createColumn(Long boardId, String givenTitle) {
        var board = boardReader.getBoardById(boardId);
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
