package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.valueobjects.Title;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
public class RowCreator {

    public final RowRepository rowRepository;

    public Row createRow(Board board, String givenTitle) {
        var boardRows = new PositionableList<>(board.getRows());
        var position = board.getPositionForNewRow();
        var row = new Row(new Title(givenTitle), position, board);

        boardRows.withHigherOrEqualPositionThanGiven(row);
        boardRows.moveRightAll();
        row.setPosition(position);

        rowRepository.saveAll(boardRows.list());
        return rowRepository.saveAndFlush(row);
    }
}
