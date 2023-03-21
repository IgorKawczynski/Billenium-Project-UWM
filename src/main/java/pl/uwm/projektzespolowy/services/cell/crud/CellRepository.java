package pl.uwm.projektzespolowy.services.cell.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.cell.Cell;

@Repository
interface CellRepository extends JpaRepository<Cell, Long> {
}
