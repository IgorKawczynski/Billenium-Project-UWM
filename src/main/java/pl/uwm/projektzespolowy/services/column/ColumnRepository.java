package pl.uwm.projektzespolowy.services.column;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.column.Column;

@Repository
public interface ColumnRepository extends JpaRepository<Column, Long> {
}
