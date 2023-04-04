package pl.uwm.projektzespolowy.services.board.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;

import java.util.List;

@Repository
interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("""
            SELECT u
            FROM User u
            WHERE :boardId in (SELECT b.id FROM User us JOIN us.boards b WHERE us.id = u.id)
            ORDER BY u.firstName, u.lastName
            """)
    List<User> getAllAssignedUsers(@Param("boardId") Long boardId);

}
