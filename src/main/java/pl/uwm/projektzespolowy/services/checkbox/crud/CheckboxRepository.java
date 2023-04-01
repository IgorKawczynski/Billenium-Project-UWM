package pl.uwm.projektzespolowy.services.checkbox.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;

@Repository
public interface CheckboxRepository extends JpaRepository<Checkbox, Long> {


}
