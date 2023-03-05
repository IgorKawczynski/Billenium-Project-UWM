package pl.uwm.projektzespolowy.services.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.board.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
}
