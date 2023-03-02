package pl.uwm.projektzespolowy.services.column.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.services.board.BoardRepository;
import pl.uwm.projektzespolowy.models.column.Column;
import pl.uwm.projektzespolowy.services.column.ColumnRepository;

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
