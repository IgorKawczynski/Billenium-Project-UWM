package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class BoardDeleter {

    private final BoardRepository boardRepository;

    public void deleteBoardById(Long id) {
        boardRepository.deleteById(id);
    }

}
