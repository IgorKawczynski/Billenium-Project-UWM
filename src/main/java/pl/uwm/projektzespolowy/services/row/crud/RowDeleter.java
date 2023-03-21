package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.services.PositionableList;
import pl.uwm.projektzespolowy.services.cell.crud.CellRepository;

@Component
@RequiredArgsConstructor
class RowDeleter {

    private final RowRepository rowRepository;
    private final CellRepository cellRepository;

    public void deleteRow(Board board, Row rowToDelete) {

        var boardRows = new PositionableList<>(board.getRows());
        boardRows.withHigherOrEqualPositionThanGiven(rowToDelete);
        boardRows.moveLeftAll();

        for(int i=0; i<board.getColumns().size(); i++) {

            var boardCells = new PositionableList<>(board.getColumns().get(i).getCells());
            boardCells.withHigherOrEqualPositionThanGiven(board.getColumns().get(i).getCells().get(rowToDelete.getPosition().value() - 1));
            boardCells.moveLeftAll();

            board
             .getColumns()
             .get(i)
             .getCells()
             .remove(rowToDelete.getPosition().value());

            cellRepository
             .delete(board.getColumns()
             .get(i)
             .getCells()
             .get(rowToDelete.getPosition().value()));

        }

        board.deleteRow(rowToDelete);
        rowRepository.delete(rowToDelete);
        rowRepository.saveAll(boardRows.list());

    }
}
