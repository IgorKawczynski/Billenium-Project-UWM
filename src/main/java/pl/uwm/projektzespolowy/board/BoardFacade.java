package pl.uwm.projektzespolowy.board;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.board.dtos.BoardCreateDTO;

@Component
@RequiredArgsConstructor
public class BoardFacade {

    private final BoardReader reader;
    private final BoardCreator creator;

    public Board getBoardById(Long id) {
        return reader.getBoardById(id);
    }

    public Board createBoard(BoardCreateDTO boardCreateDTO) {
        return creator.createBoard(boardCreateDTO.title(), boardCreateDTO.userId());
    }

}
