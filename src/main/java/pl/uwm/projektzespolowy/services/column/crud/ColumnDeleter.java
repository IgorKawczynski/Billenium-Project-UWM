package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class ColumnDeleter {

    private final ColumnRepository columnRepository;

    public void deleteColumn(Board board, Column columnToDelete) {
        var boardColumns = new PositionableList<>(board.getColumns());

        boardColumns.withHigherOrEqualPositionThanGiven(columnToDelete);
        boardColumns.moveLeftAll();

        board.deleteColumn(columnToDelete);
        columnRepository.delete(columnToDelete);
        columnRepository.saveAll(boardColumns.list());
    }

}
