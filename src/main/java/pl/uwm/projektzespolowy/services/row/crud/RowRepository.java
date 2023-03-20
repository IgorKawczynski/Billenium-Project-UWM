package pl.uwm.projektzespolowy.services.row.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.row.Row;

import java.util.List;

@Repository
public interface RowRepository extends JpaRepository<Row, Long> {

    List<Row> findAllByBoardId(Long boardId);
}
