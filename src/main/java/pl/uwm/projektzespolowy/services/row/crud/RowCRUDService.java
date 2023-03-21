package pl.uwm.projektzespolowy.services.row.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.row.Row;
import pl.uwm.projektzespolowy.models.row.RowResponseDTO;
import pl.uwm.projektzespolowy.models.row.RowUpdateDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RowCRUDService {

    private final RowCreator rowCreator;
    private final RowReader rowReader;
    private final RowUpdater rowUpdater;
    private final RowDeleter rowDeleter;

    public RowResponseDTO createRow(Board board, String title) {
        return rowCreator.createRow(board, title).toDto();
    }

    public Row getRowById(Long rowId) {
        return rowReader.getRowById(rowId);
    }

    public List<Row> getAllRowsByBoardId(Long boardId) {
        return rowReader.getAllRowsByBoardId(boardId);
    }

    public RowResponseDTO updateRow(RowUpdateDTO rowUpdateDTO) {
        var rowId = Long.parseLong(rowUpdateDTO.rowId());
        var rowToChange = rowReader.getRowById(rowId);
        return rowUpdater
                .editRow(rowToChange, rowUpdateDTO.title())
                .toDto();
    }

    public void deleteRow(Board board, Long rowId) {
        var rowToDelete = rowReader.getRowById(rowId);
        rowDeleter.deleteRow(board, rowToDelete);
    }

}
