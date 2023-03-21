package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.services.PositionableList;

@Component
@RequiredArgsConstructor
class RowDeleter {

    private final RowRepository rowRepository;

    public void deleteRow(Board board, Row rowToDelete) {
        var boardRows = new PositionableList<>(board.getRows());

        boardRows.withHigherOrEqualPositionThanGiven(rowToDelete);
        boardRows.moveLeftAll();

        board.deleteRow(rowToDelete);
        rowRepository.delete(rowToDelete);
        rowRepository.saveAll(boardRows.list());
    }
}
