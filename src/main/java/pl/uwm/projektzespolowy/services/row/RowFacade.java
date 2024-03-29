package pl.uwm.projektzespolowy.services.row;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.row.RowCreateDTO;
import pl.uwm.projektzespolowy.models.row.RowResponseDTO;
import pl.uwm.projektzespolowy.models.row.RowUpdateDTO;
import pl.uwm.projektzespolowy.services.board.crud.BoardCRUDService;
import pl.uwm.projektzespolowy.services.row.crud.RowCRUDService;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RowFacade {

    private final RowCRUDService rowCRUDService;
    private final BoardCRUDService boardCRUDService;

    public Row createRow(RowCreateDTO rowCreateDTO) {
        var board = boardCRUDService.getBoardById(Long.parseLong(rowCreateDTO.boardId()));
        return rowCRUDService.createRow(board, rowCreateDTO.title());
    }

    public RowResponseDTO getRowById(Long rowId) {
        return rowCRUDService.getRowById(rowId).toDto();
    }

    public List<RowResponseDTO> getAllRowsByBoardId(Long boardId) {
        return rowCRUDService
                .getAllRowsByBoardId(boardId)
                .stream().map(Row::toDto)
                .sorted(Comparator.comparingInt(RowResponseDTO::position))
                .toList();
    }

    public RowResponseDTO updateRow(RowUpdateDTO rowUpdateDTO) {
        var rowId = Long.parseLong(rowUpdateDTO.rowId());
        return rowCRUDService.updateRow(rowId, rowUpdateDTO.title()).toDto();
    }

    public void deleteRow(Long rowId) {
        rowCRUDService.deleteRow(rowId);
    }

}
