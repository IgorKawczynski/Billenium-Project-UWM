package pl.uwm.projektzespolowy.column;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.board.BoardRepository;

@Component
@RequiredArgsConstructor
public class ColumnCreator {

    private final BoardRepository boardRepository;
    private final ColumnRepository columnRepository;

    public Column createColumn(String title, Integer cardsLimit, Integer position, Long boardId) {
        var columnsBoard = boardRepository.getReferenceById(boardId);
        return columnRepository.saveAndFlush(new Column(title, cardsLimit, position, columnsBoard));
    }
}
