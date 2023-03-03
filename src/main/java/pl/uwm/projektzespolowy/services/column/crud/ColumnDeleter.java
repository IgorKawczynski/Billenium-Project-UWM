package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.board.crud.BoardReader;
import pl.uwm.projektzespolowy.services.column.ColumnRepository;

@Component
@RequiredArgsConstructor
public class ColumnDeleter {

    private final ColumnRepository columnRepository;
    private final BoardReader boardReader;

    public void deleteColumn(Column columnToDelete) {
        var board = boardReader.getBoardById(columnToDelete.getBoard().getId());
        var boardColumns = board.getColumns();
        var columnsWithHigherPositionThanColumnToDelete =
                boardColumns.stream()
                        .filter(column -> columnToDelete.getPosition().compareTo(column.getPosition()) < 0)
                        .toList();

        columnsWithHigherPositionThanColumnToDelete
                .forEach(column -> column.setPosition(column.getPosition() - 1));

        board.deleteColumn(columnToDelete);
        columnRepository.delete(columnToDelete);
        columnRepository.saveAll(columnsWithHigherPositionThanColumnToDelete);
    }

}
