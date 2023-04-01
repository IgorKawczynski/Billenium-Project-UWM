package pl.uwm.projektzespolowy.services.checkbox.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;

import java.util.List;

@Repository
interface CheckboxRepository extends JpaRepository<Checkbox, Long> {

    List<Checkbox> findAllByCardId(Long cardId);

}
