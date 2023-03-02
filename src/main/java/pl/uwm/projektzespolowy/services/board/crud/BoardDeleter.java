package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.services.board.BoardRepository;

@Component
@RequiredArgsConstructor
public class BoardDeleter {

    private final BoardRepository boardRepository;

    public void deleteBoardById(Long id) {
        boardRepository.deleteById(id);
    }

}
