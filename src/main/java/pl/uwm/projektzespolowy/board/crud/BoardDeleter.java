package pl.uwm.projektzespolowy.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.board.BoardRepository;

@Component
@RequiredArgsConstructor
public class BoardDeleter {

    private final BoardRepository boardRepository;

    public void deleteBoardById(Long id) {
        boardRepository.deleteById(id);
    }

}
