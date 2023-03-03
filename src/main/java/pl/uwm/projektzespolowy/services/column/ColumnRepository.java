package pl.uwm.projektzespolowy.services.column;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.column.Column;

import java.util.List;

@Repository
public interface ColumnRepository extends JpaRepository<Column, Long> {

    List<Column> findAllByBoardId(Long boardId);

}
