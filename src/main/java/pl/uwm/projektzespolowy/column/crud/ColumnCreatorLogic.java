package pl.uwm.projektzespolowy.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.board.BoardRepository;
import pl.uwm.projektzespolowy.column.Column;
import pl.uwm.projektzespolowy.column.ColumnRepository;
import pl.uwm.projektzespolowy.column.dtos.ColumnCreateDTO;

import java.util.Comparator;
import java.util.NoSuchElementException;

import static pl.uwm.projektzespolowy.column.Column.UNLIMITED_SIZE;

@Component
@RequiredArgsConstructor
public class ColumnCreatorLogic {

    private final ColumnCreator columnCreator;
    private final ColumnRepository columnRepository;
    private final BoardRepository boardRepository;

    public Column createColumnInPenultimatePosition(ColumnCreateDTO createDTO) {
        var maxPositionColumn = getMaxPositionColumnInBoard(createDTO.boardId());

        Integer maxPositionBeforeAddingColumn = maxPositionColumn.getPosition();

        updateIncrementedColumnPosition(maxPositionColumn);

        return columnCreator.createColumn(createDTO.title(), UNLIMITED_SIZE, maxPositionBeforeAddingColumn, createDTO.boardId());
    }

    private Column getMaxPositionColumnInBoard(Long boardId) {
        var board = boardRepository.getReferenceById(boardId);
        var columns = board.getColumns();
        return columns.stream().max(Comparator.comparing(Column::getPosition)).orElseThrow(NoSuchElementException::new);
    }

    private void updateIncrementedColumnPosition(Column column) {
        Integer newMaxPosition = column.getPosition() + 1;
        column.setPosition(newMaxPosition);
        columnRepository.saveAndFlush(column);
    }

}
