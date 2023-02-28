package pl.uwm.projektzespolowy.column;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ColumnRepository extends JpaRepository<Column, Long> {
}
