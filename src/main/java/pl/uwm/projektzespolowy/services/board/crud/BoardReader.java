package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.services.board.BoardRepository;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

@Component
@RequiredArgsConstructor
public class BoardReader {

    private final BoardRepository repository;

    public Board getBoardById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("board", "Board with id: " + id + " does not exist!"));
    }

}
