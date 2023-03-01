package pl.uwm.projektzespolowy.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.board.Board;
import pl.uwm.projektzespolowy.board.BoardRepository;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;

@Component
@RequiredArgsConstructor
public class BoardReader {

    private final BoardRepository repository;

    public Board getBoardById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Board with id: " + id + " does not exist!"));
    }

}
