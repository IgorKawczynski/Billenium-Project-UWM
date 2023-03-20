package pl.uwm.projektzespolowy.services.board.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.board.Board;

@Repository
interface BoardRepository extends JpaRepository<Board, Long> {
}
