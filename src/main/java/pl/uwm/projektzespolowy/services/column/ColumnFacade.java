package pl.uwm.projektzespolowy.services.column;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.basic.dto.MoveDTO;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.models.column.ColumnCreateDTO;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.column.ColumnUpdateDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.column.crud.ColumnCRUDService;

import java.util.Comparator;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ColumnFacade {

    private final ColumnCRUDService columnCRUDService;
    private final BoardCRUDService boardCRUDService;
    private final ColumnMoverService columnMoverService;

    public Column createColumn(ColumnCreateDTO columnCreateDTO) {
        var board = boardCRUDService.getBoardById(Long.parseLong(columnCreateDTO.boardId()));
        return columnCRUDService.createColumn(board, columnCreateDTO.title());
    }

    public ColumnResponseDTO getColumnById(Long columnId) {
        return columnCRUDService.getColumnById(columnId).toDto();
    }

    public List<ColumnResponseDTO> getAllColumnsByBoardId(Long boardId) {
        return columnCRUDService.getAllColumnsByBoardId(boardId)
                .stream().map(Column::toDto)
                .sorted(Comparator.comparingInt(ColumnResponseDTO::position))
                .toList();
    }

    public ColumnResponseDTO updateColumn(ColumnUpdateDTO columnUpdateDTO) {
        var columnId = Long.parseLong(columnUpdateDTO.columnId());
        return columnCRUDService
                .updateColumn(
                        columnId,
                        columnUpdateDTO.title(),
                        columnUpdateDTO.cardsLimit(),
                        columnUpdateDTO.isUnlimited()
                ).toDto();
    }

    public void deleteColumn(Long columnId) {
     columnCRUDService.deleteColumn(columnId);
    }

    public ColumnResponseDTO moveColumn(MoveDTO columnMoveDTO) {
        var column = columnCRUDService.getColumnById(Long.parseLong(columnMoveDTO.movedObjectId()));
        var changedColumns = columnMoverService.moveColumn(column, columnMoveDTO.newPosition());
        columnCRUDService.saveChangedColumn(column);
        columnCRUDService.saveChangedColumns(changedColumns);
        return column.toDto();
    }

}
