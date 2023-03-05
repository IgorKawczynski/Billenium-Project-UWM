package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.valueobjects.Position;
import pl.uwm.projektzespolowy.services.board.crud.BoardReader;
import pl.uwm.projektzespolowy.services.column.ColumnRepository;
import pl.uwm.projektzespolowy.models.column.ColumnCreateDTO;

import static pl.uwm.projektzespolowy.models.column.Column.DEFAULT_SIZE;

@Component
@RequiredArgsConstructor
public class ColumnCreatorLogic {

    private final ColumnCreator columnCreator;
    private final ColumnRepository columnRepository;
    private final BoardReader boardReader;

    public Column createColumnInPenultimatePosition(ColumnCreateDTO createDTO) {
        var boardIdLong = Long.parseLong(createDTO.boardId());
        var lastColumn = getLastColumnInBoard(boardIdLong);
        if (lastColumn == null) {
            return columnCreator.createColumn(createDTO.title(), DEFAULT_SIZE, 0, boardIdLong);
        }

        Integer newPenultimatePosition = lastColumn.getPosition().value();
        updateIncrementedLastPositionColumn(lastColumn);
        return columnCreator.createColumn(createDTO.title(), DEFAULT_SIZE, newPenultimatePosition, boardIdLong);
    }

    private Column getLastColumnInBoard(Long boardId) {
        var board = boardReader.getBoardById(boardId);
        var columns = board.getColumns();
        return columns.stream()
                .reduce((c1, c2) -> c1.getPosition().value() > c2.getPosition().value() ? c1 : c2)
                .orElse(null);
    }

    private void updateIncrementedLastPositionColumn(Column column) {
        int newLastPosition = column.getPosition().value() + 1;
        column.setPosition(new Position(newLastPosition));
        columnRepository.saveAndFlush(column);
    }

}
