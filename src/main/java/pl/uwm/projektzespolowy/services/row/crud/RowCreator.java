package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.cell.Cell;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.models.valueobjects.Title;

@Component
@RequiredArgsConstructor
class RowCreator {

    public final RowRepository rowRepository;

    public Row createRow(Board board, String givenTitle) {
        var position = board.getPositionForNewRow();
        var row = new Row(new Title(givenTitle), position, board);

        for(int i=0; i<board.getColumns().size(); i++) {
            board
             .getColumns()
             .get(i)
             .getCells()
             .add(new Cell(board.getColumns().get(i), new Position(board.getRows().size())));
        }

        return rowRepository.saveAndFlush(row);
    }
}
