package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.services.board.BoardRepository;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.column.ColumnRepository;
import pl.uwm.projektzespolowy.models.column.ColumnCreateDTO;

import static pl.uwm.projektzespolowy.models.column.Column.DEFAULT_SIZE;

@Component
@RequiredArgsConstructor
public class ColumnCreatorLogic {

    private final ColumnCreator columnCreator;
    private final ColumnRepository columnRepository;
    private final BoardRepository boardRepository;

    public Column createColumnInPenultimatePosition(ColumnCreateDTO createDTO) {
        var lastColumn = getLastColumnInBoard(createDTO.boardId());
        if (lastColumn == null) {
            return columnCreator.createColumn(createDTO.title(), DEFAULT_SIZE, 0, createDTO.boardId());
        }

        Integer newPenultimatePosition = lastColumn.getPosition();
        updateIncrementedLastPositionColumn(lastColumn);
        return columnCreator.createColumn(createDTO.title(), DEFAULT_SIZE, newPenultimatePosition, createDTO.boardId());
    }

    private Column getLastColumnInBoard(Long boardId) {
        var board = boardRepository.getReferenceById(boardId);
        var columns = board.getColumns();
        return columns.stream()
                .reduce((c1, c2) -> c1.getPosition() > c2.getPosition() ? c1 : c2)
                .orElse(null);
    }

    private void updateIncrementedLastPositionColumn(Column column) {
        Integer newLastPosition = column.getPosition() + 1;
        column.setPosition(newLastPosition);
        columnRepository.saveAndFlush(column);
    }

}
