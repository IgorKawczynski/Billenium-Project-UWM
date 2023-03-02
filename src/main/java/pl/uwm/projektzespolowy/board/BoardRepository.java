package pl.uwm.projektzespolowy.board;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.uwm.projektzespolowy.models.board.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
