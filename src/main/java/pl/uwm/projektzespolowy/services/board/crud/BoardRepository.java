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

    @Query("""
            SELECT b
            FROM Board b
            JOIN Column col ON col.board.id = b.id
            JOIN Cell cell ON cell.column.id = col.id
            JOIN Card ca ON ca.cell.id = cell.id
            WHERE ca.id = :cardId
            """)
    Board getBoardByCardId(@Param("cardId") Long cardId);

    @Query("""
            SELECT count(c)
            FROM Card c
            JOIN Cell cell ON cell.id = c.cell.id
            JOIN Column col ON col.id = cell.column.id
            JOIN Board boa ON boa.id = col.board.id
            WHERE boa.id = :boardId
            AND :user MEMBER OF c.assignedUsers
            """)
    Integer getAmountOfAssignedCardsToUser(@Param("user") User user, @Param("boardId") Long boardId);
}
