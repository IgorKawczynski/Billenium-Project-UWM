package pl.uwm.projektzespolowy.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.basic.UpdateDTO;
import pl.uwm.projektzespolowy.basic.ValidatorService;
import pl.uwm.projektzespolowy.board.Board;
import pl.uwm.projektzespolowy.board.BoardRepository;

@Component
@RequiredArgsConstructor
public class BoardUpdater {

    private final BoardRepository boardRepository;
    private final ValidatorService validatorService;
    private final BoardReader boardReader;

    public void updateBoardField(Board board, String fieldName, Object value) {
        validatorService.isNull(fieldName, value);
        switch (fieldName) {
            case "title" -> {
                String title = (String) value;
                board.setTitle(title);
            }
        }
        boardRepository.saveAndFlush(board);
    }

    // TODO: Error handling
    public void updateBoard(UpdateDTO updateDTO) {
        var board = boardReader.getBoardById(updateDTO.id());
        updateBoardField(board, updateDTO.fieldName(), updateDTO.value());
    }

}
